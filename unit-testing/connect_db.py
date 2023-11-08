import os
import psycopg2
from psycopg2.extras import RealDictCursor

def connect_db():
    # retrieve env
    db_name = os.environ.get("POSTGRES_DB")
    if db_name == "": db_name = "TESTING"

    db_user = os.environ.get("POSTGRES_USER")
    if db_user == "": db_user = "TESTING"

    db_pass = os.environ.get("POSTGRES_PASSWORD")
    if db_pass == "": db_pass = "TESTING"

    # connect to local db
    return psycopg2.connect(host = "localhost", dbname = db_name, user = db_user, password = db_pass, port = 5432, cursor_factory = RealDictCursor)