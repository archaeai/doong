from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, scoped_session, sessionmaker


engine = create_engine('sqlite:///test.db', echo=False)
Base = declarative_base()
session = scoped_session(sessionmaker(autocommit=True,
	autoflush=False, bind=engine))
