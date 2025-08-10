# from flask import Blueprint, request, jsonify
# from flask_login import login_user, logout_user, login_required, current_user
# from werkzeug.security import generate_password_hash, check_password_hash
# import requests, os
# from dotenv import load_dotenv
# from models import save_message, get_history, delete_message, find_user, add_user
# from user import User

# chat_bp = Blueprint("chat", __name__)

# load_dotenv()
# OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
# OPENAI_URL = "https://api.openai.com/v1/chat/completions"

# # -------- Signup --------
# @chat_bp.route("/signup", methods=["POST"])
# def signup():
#     data = request.json
#     email = data.get("email")
#     password = data.get("password")

#     if find_user(email):
#         return jsonify({"error": "Email already exists"}), 400

#     password_hash = generate_password_hash(password)
#     add_user(email, password_hash)
#     return jsonify({"status": "User created"})

# # -------- Login --------
# @chat_bp.route("/login", methods=["POST"])
# def login():
#     data = request.json
#     email = data.get("email")
#     password = data.get("password")

#     user = find_user(email)
#     if not user or not check_password_hash(user["password"], password):
#         return jsonify({"error": "Invalid credentials"}), 401

#     flask_user = User(user)
#     login_user(flask_user)
#     return jsonify({"status": "Logged in", "user_id": str(user["_id"])})

# # -------- Logout --------
# @chat_bp.route("/logout", methods=["POST"])
# @login_required
# def logout():
#     logout_user()
#     return jsonify({"status": "Logged out"})

# # -------- Ask ChatGPT --------
# @chat_bp.route("/ask", methods=["POST"])
# @login_required
# def ask():
#     try:
#         data = request.json
#         question = data.get("question")
#         user_id = str(current_user.id)

#         if not question:
#             return jsonify({"error": "Question is required"}), 400

#         payload = {
#             "model": "gpt-3.5-turbo",
#             "messages": [{"role": "user", "content": question}]
#         }
#         headers = {"Authorization": f"Bearer {OPENAI_API_KEY}"}

#         print("Sending to OpenAI:", payload)  # Debug
#         response = requests.post(OPENAI_URL, json=payload, headers=headers)
#         print("OpenAI status:", response.status_code, response.text)  # Debug

#         response.raise_for_status()
#         answer = response.json()["choices"][0]["message"]["content"]

#         save_message(user_id, question, answer)
#         return jsonify({"answer": answer})

#     except Exception as e:
#         import traceback
#         traceback.print_exc()
#         return jsonify({"error": f"Server error: {str(e)}"}), 500
# # print("API KEY: ", os.getenv("OPENAI_API_KEY"))




# # -------- History --------
# @chat_bp.route("/history", methods=["GET"])
# @login_required
# def history():
#     user_id = str(current_user.id)
#     history_list = get_history(user_id)
#     for h in history_list:
#         h["_id"] = str(h["_id"])
#     return jsonify(history_list)

# # -------- Delete Message --------
# @chat_bp.route("/delete/<msg_id>", methods=["DELETE"])
# @login_required
# def delete(msg_id):
#     delete_message(msg_id)
#     return jsonify({"status": "deleted"})





from flask import Blueprint, request, jsonify
from flask_login import login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
import requests, os
from dotenv import load_dotenv
from models import save_message, get_history, delete_message, find_user, add_user
from user import User

# Cloudinary setup
import cloudinary
import cloudinary.uploader

load_dotenv()
cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET")
)

chat_bp = Blueprint("chat", __name__)

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENAI_URL = "https://api.openai.com/v1/chat/completions"

# -------- Signup --------
@chat_bp.route("/signup", methods=["POST"])
def signup():
    email = request.form.get("email")
    password = request.form.get("password")
    file_to_upload = request.files.get("file")

    if not email or not password:
        return jsonify({"error": "Email and password are required!"}), 400

    if find_user(email):
        return jsonify({"error": "Email already exists"}), 400

    profile_pic_url = None
    if file_to_upload:
        try:
            upload_result = cloudinary.uploader.upload(
                file_to_upload,
                folder="profile_pictures",
                use_filename=True,
                unique_filename=True,
                overwrite=True,
            )
            profile_pic_url = upload_result.get("secure_url")
        except Exception as e:
            return jsonify({"error": f"Image upload failed: {str(e)}"}), 500

    password_hash = generate_password_hash(password)
    add_user(email, password_hash, profile_pic_url)
    return jsonify({"status": "User created"})

# -------- Login --------
@chat_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = find_user(email)
    if not user or not check_password_hash(user["password"], password):
        return jsonify({"error": "Invalid credentials"}), 401

    flask_user = User(user)
    login_user(flask_user)
    return jsonify({
        "status": "Logged in",
        "user_id": str(user["_id"]),
        "profile_pic": user.get("profile_pic")
    })

# -------- Logout --------
@chat_bp.route("/logout", methods=["POST"])
@login_required
def logout():
    logout_user()
    return jsonify({"status": "Logged out"})

# -------- Ask ChatGPT --------
@chat_bp.route("/ask", methods=["POST"])
@login_required
def ask():
    try:
        data = request.json
        question = data.get("question")
        user_id = str(current_user.id)

        if not question:
            return jsonify({"error": "Question is required"}), 400

        payload = {
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "user", "content": question}]
        }
        headers = {"Authorization": f"Bearer {OPENAI_API_KEY}"}

        print("Sending to OpenAI:", payload)  # Debug
        response = requests.post(OPENAI_URL, json=payload, headers=headers)
        print("OpenAI status:", response.status_code, response.text)  # Debug

        response.raise_for_status()
        answer = response.json()["choices"][0]["message"]["content"]

        save_message(user_id, question, answer)
        return jsonify({"answer": answer})

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": f"Server error: {str(e)}"}), 500

# -------- History --------
@chat_bp.route("/history", methods=["GET"])
@login_required
def history():
    user_id = str(current_user.id)
    history_list = get_history(user_id)
    for h in history_list:
        h["_id"] = str(h["_id"])
    return jsonify(history_list)

# -------- Delete Message --------
@chat_bp.route("/delete/<msg_id>", methods=["DELETE"])
@login_required
def delete(msg_id):
    delete_message(msg_id)
    return jsonify({"status": "deleted"})