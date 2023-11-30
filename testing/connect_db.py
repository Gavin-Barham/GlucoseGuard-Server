import psycopg2
from psycopg2.extras import RealDictCursor

def connect_db():
    # connect to local db
    return psycopg2.connect(host = "localhost", dbname = "TESTING", user = "TESTING", password = "TESTING", port = 5432, cursor_factory = RealDictCursor)