from pymongo import MongoClient
from bson.objectid import ObjectId
from dotenv import load_dotenv
import os

load_dotenv()

client = MongoClient(os.getenv("MONGODB_URI"))
db = client["chatgpt_app"]

# Chat message functions
def save_message(user_id, question, answer):
    db["messages"].insert_one({"user_id": user_id, "question": question, "answer": answer})

def get_history(user_id):
    return list(db["messages"].find({"user_id": user_id}))

def delete_message(msg_id):
    db["messages"].delete_one({"_id": ObjectId(msg_id)})

# User functions
def add_user(email, password_hash, profile_pic_url=None):
    db["users"].insert_one({"email": email, "password": password_hash, "profile_pic": profile_pic_url})

def find_user(email):
    return db["users"].find_one({"email": email})

def find_user_by_id(user_id):
    return db["users"].find_one({"_id": ObjectId(user_id)})
