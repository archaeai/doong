# crud/cat_profile.py
from sqlalchemy.orm import Session
from typing import List, Optional
from backend.models import CatProfile, DefaultTask, DailyTaskLog
from backend.schemas import CatProfileCreate, CatProfileUpdate
from datetime import datetime, timedelta, date
from dateutil.relativedelta import relativedelta
import pytz


def get_cat_profile(db: Session, cat_profile_id: int) -> Optional[CatProfile]:
    return db.query(CatProfile).filter(CatProfile.id == cat_profile_id).first()


def get_cat_profiles(db: Session) -> List[CatProfile]:
    return db.query(CatProfile).all()


def get_cat_profiles_by_user(db: Session, user_id : str) -> List[CatProfile]:
    return db.query(CatProfile).filter(CatProfile.user_id == user_id).all()


    
def calculate_next_date(start_date: date, period_type: str, period_int: int) -> date:
    if period_type == "D":
        return start_date + timedelta(days=period_int)
    elif period_type == "W":
        return start_date + timedelta(weeks=period_int)
    elif period_type == "M":
        return start_date + relativedelta(months=period_int)
    elif period_type == "Y":
        return start_date + relativedelta(years=period_int)
    return start_date



def create_cat_profile(db: Session, task_dict: dict, cat_profile: CatProfileCreate) -> CatProfile:
    db_cat_profile = CatProfile(**cat_profile.dict())
    db.add(db_cat_profile)
    db.commit()
    db.refresh(db_cat_profile)

    # note를 통해 DefaultTask 가져오기
    heartworm_task = db.query(DefaultTask).filter(DefaultTask.note == "심장사상충 예방약 투여").first()
    litter_task = db.query(DefaultTask).filter(DefaultTask.note == "모래갈이").first()
    vaccine_task = db.query(DefaultTask).filter(DefaultTask.note == "연간 백신 접종").first()
    
    # 매일 해야하는 기본 업무 가져오기 (period_type이 "D"인 것들)
    daily_default_tasks = db.query(DefaultTask).filter(DefaultTask.cat_id == 0, DefaultTask.period_type == "D").all()

    # task_dict에 있는 날짜를 이용하여 DailyTaskLog 생성
    for task_date_key, task_date_value in task_dict.items():
        if task_date_value:
            task_date_value = datetime.strptime(task_date_value, '%Y-%m-%d').date()
            task = None
            if task_date_key == 'heart_warm_date':
                task = heartworm_task
            elif task_date_key == 'litter_date':
                task = litter_task
            elif task_date_key == 'vaccine_date':
                task = vaccine_task

            if task:
                # 첫 번째 DailyTaskLog 생성
                daily_task_log = DailyTaskLog(
                    date=task_date_value,
                    note=task.note,
                    cat_id=db_cat_profile.id,
                    done=True,
                    task_id=task.id,
                )
                db.add(daily_task_log)

                # 다음 수행 날짜 계산 및 생성
                next_date = calculate_next_date(task_date_value, task.period_type, task.period_int)
                if next_date <= date.today():
                    daily_task_log = DailyTaskLog(
                        date=date.today(),
                        note=task.note,
                        cat_id=db_cat_profile.id,
                        done=False,
                        task_id=task.id
                    )
                else:
                    daily_task_log = DailyTaskLog(
                        date=next_date,
                        note=task.note,
                        cat_id=db_cat_profile.id,
                        done=False,
                        task_id=task.id
                    )
                db.add(daily_task_log)
                next_date = calculate_next_date(next_date, task.period_type, task.period_int)
    
     # 매일 해야하는 기본 업무 추가
    tz = pytz.timezone('Asia/Seoul')
    now = datetime.now(tz=tz).date()
    for daily_task in daily_default_tasks:
        daily_task_log = DailyTaskLog(
            date=now,
            note=daily_task.note,
            cat_id=db_cat_profile.id,
            done=False,
            task_id=daily_task.id,
        )
        db.add(daily_task_log)
    db.commit()

    return db_cat_profile


def update_cat_profile(db: Session, cat_profile_id: int, cat_profile_data: dict):
    db_cat_profile = db.query(CatProfile).filter(CatProfile.id == cat_profile_id).first()
    if not db_cat_profile:
        return None

    for key, value in cat_profile_data.items():
        setattr(db_cat_profile, key, value)

    db.commit()
    db.refresh(db_cat_profile)
    return db_cat_profile


def delete_cat_profile(db: Session, cat_profile_id: int) -> Optional[CatProfile]:
    db_cat_profile = db.query(CatProfile).filter(CatProfile.id == cat_profile_id).first()
    if db_cat_profile:
        db.delete(db_cat_profile)
        db.commit()
    return db_cat_profile


import keras, sys, cv2, os
from keras.models import Model, load_model
import numpy as np
import pandas as pd
from math import atan2, degrees



def resize_img(im, img_size=224):
  old_size = im.shape[:2] # old_size is in (height, width) format
  ratio = float(img_size) / max(old_size)
  new_size = tuple([int(x*ratio) for x in old_size])
  # new_size should be in (width, height) format
  im = cv2.resize(im, (new_size[1], new_size[0]))
  delta_w = img_size - new_size[1]
  delta_h = img_size - new_size[0]
  top, bottom = delta_h // 2, delta_h - (delta_h // 2)
  left, right = delta_w // 2, delta_w - (delta_w // 2)
  new_im = cv2.copyMakeBorder(im, top, bottom, left, right, cv2.BORDER_CONSTANT,
      value=[0, 0, 0])
  return new_im, ratio, top, left

# overlay function
def overlay_transparent(background_img, img_to_overlay_t, x, y, overlay_size=None):
  bg_img = background_img.copy()
  # convert 3 channels to 4 channels
  if bg_img.shape[2] == 3:
    bg_img = cv2.cvtColor(bg_img, cv2.COLOR_BGR2BGRA)

  if overlay_size is not None:
    img_to_overlay_t = cv2.resize(img_to_overlay_t.copy(), overlay_size)

  b, g, r, a = cv2.split(img_to_overlay_t)

  mask = cv2.medianBlur(a, 5)

  h, w, _ = img_to_overlay_t.shape
  roi = bg_img[int(y-h/2):int(y+h/2), int(x-w/2):int(x+w/2)]

  img1_bg = cv2.bitwise_and(roi.copy(), roi.copy(), mask=cv2.bitwise_not(mask))
  img2_fg = cv2.bitwise_and(img_to_overlay_t, img_to_overlay_t, mask=mask)

  bg_img[int(y-h/2):int(y+h/2), int(x-w/2):int(x+w/2)] = cv2.add(img1_bg, img2_fg)

  # convert 4 channels to 4 channels
  bg_img = cv2.cvtColor(bg_img, cv2.COLOR_BGRA2BGR)

  return bg_img

def angle_between(p1, p2):
  xDiff = p2[0] - p1[0]
  yDiff = p2[1] - p1[1]
  return degrees(atan2(yDiff, xDiff))


def create_cat_face(dir, file_name , img_size=224):
    # this is most important thing
    glasses = cv2.imread('images/happy.png', cv2.IMREAD_UNCHANGED)
    glasses1 = cv2.imread('images/sad.png', cv2.IMREAD_UNCHANGED)

    bbs_model_name = 'models/bbs_1.h5'
    lmks_model_name = 'models/lmks_1.h5'
    bbs_model = load_model(bbs_model_name, compile=False)
    lmks_model = load_model(lmks_model_name, compile=False)
    f=f"{dir}{file_name}"
    # testing
    if '.jpg' in f or 'jpeg' in f:

        img = cv2.imread(f)

        ori_img = img.copy()
        result_img = img.copy()
        result_img1 = img.copy()
        
        # predict bounding box
        img, ratio, top, left = resize_img(img)
        
        inputs = (img.astype('float32') / 255).reshape((1, img_size, img_size, 3))
        pred_bb = bbs_model.predict(inputs)[0].reshape((-1, 2))
        
        # compute bounding box of original image
        ori_bb = ((pred_bb - np.array([left, top])) / ratio).astype(int)
        
        # compute lazy bounding box for detecting landmarks
        center = np.mean(ori_bb, axis=0)
        face_size = max(np.abs(ori_bb[1] - ori_bb[0]))
        new_bb = np.array([
            center - face_size * 0.6,
            center + face_size * 0.6
        ]).astype(int)
        new_bb = np.clip(new_bb, 0, 99999)
        
        # predict landmarks
        face_img = ori_img[new_bb[0][1]:new_bb[1][1], new_bb[0][0]:new_bb[1][0]]
        face_img, face_ratio, face_top, face_left = resize_img(face_img)
        
        face_inputs = (face_img.astype('float32') / 255).reshape((1, img_size, img_size, 3))
        
        pred_lmks = lmks_model.predict(face_inputs)[0].reshape((-1, 2))
        
        # compute landmark of original image
        new_lmks = ((pred_lmks - np.array([face_left, face_top])) / face_ratio).astype(int)
        ori_lmks = new_lmks + new_bb[0]
        
        # visualize
        cv2.rectangle(ori_img, pt1=tuple(ori_bb[0]), pt2=tuple(ori_bb[1]), color=(255, 255, 255), thickness=2)
        
        for i, l in enumerate(ori_lmks):
            cv2.putText(ori_img, str(i), tuple(l), cv2.FONT_HERSHEY_SIMPLEX, 1, (255,255,255), 2, cv2.LINE_AA)
            cv2.circle(ori_img, center=tuple(l), radius=1, color=(255, 255, 255), thickness=2)
        
        
        
        # wearing glasses
        glasses_center = np.mean([ori_lmks[0], ori_lmks[1]], axis=0)
        
        glasses_size = np.linalg.norm(ori_lmks[0] - ori_lmks[1]) * 2.8
        
        angle = -angle_between(ori_lmks[0], ori_lmks[1])
        
        
        
        M = cv2.getRotationMatrix2D((glasses.shape[1] / 2, glasses.shape[0] / 2), angle, 1)
        rotated_glasses = cv2.warpAffine(glasses, M, (glasses.shape[1],glasses.shape[0]))
        
        try:
            result_img = overlay_transparent(result_img, rotated_glasses, glasses_center[0], glasses_center[1], overlay_size=(int(glasses_size), int(glasses.shape[0] * glasses_size / glasses.shape[1])))
        except:
            print('failed overlay image')
        
        cv2.imwrite(f'{dir}happy_{file_name}', result_img)
        
        
        M1 = cv2.getRotationMatrix2D((glasses1.shape[1] / 2, glasses1.shape[0] / 2), angle, 1)
        rotated_glasses1 = cv2.warpAffine(glasses1, M1, (glasses1.shape[1],glasses1.shape[0]))
        
        try:
            result_img1 = overlay_transparent(result_img1, rotated_glasses1, glasses_center[0], glasses_center[1], overlay_size=(int(glasses_size), int(glasses1.shape[0] * glasses_size / glasses1.shape[1])))
        except:
            print('failed overlay image')
        
        cv2.imwrite(f'{dir}sad_{file_name}', result_img1)
