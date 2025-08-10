# import cloudinary
# import cloudinary.uploader
# import cloudinary.api
# from flask import Flask
# from flask_cors import CORS
# from flask_login import LoginManager
# from models import find_user_by_id
# from user import User
# from routes import chat_bp
# from dotenv import load_dotenv
# import os



# load_dotenv()

# app = Flask(__name__)
# app.secret_key = os.getenv("SECRET_KEY", "supersecret")

# cloudinary.config(
#     cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
#     api_key=os.getenv("CLOUDINARY_API_KEY"),
#     api_secret=os.getenv("CLOUDINARY_API_SECRET"),
# )

# # CORS with credentials
# CORS(app, supports_credentials=True, origins=["http://localhost:5173"])

# # Flask-Login setup
# login_manager = LoginManager()
# login_manager.init_app(app)



# @login_manager.user_loader
# def load_user(user_id):
#     user_dict = find_user_by_id(user_id)
#     return User(user_dict) if user_dict else None

# # Register routes
# app.register_blueprint(chat_bp)

# if __name__ == "__main__":
#     app.run(port=5000, debug=True)











import cloudinary
import cloudinary.uploader
import cloudinary.api
from flask import Flask
from flask_cors import CORS
from flask_login import LoginManager
from models import find_user_by_id
from user import User
from routes import chat_bp
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY", "supersecret")

# Configure Cloudinary
cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
)

# Get allowed frontend origin from env (for CORS)
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

# Enable CORS for the given origin with credentials
CORS(app, supports_credentials=True, origins=[FRONTEND_URL])

# Flask-Login setup
login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    user_dict = find_user_by_id(user_id)
    return User(user_dict) if user_dict else None

# Register routes
app.register_blueprint(chat_bp)

if __name__ == "__main__":
    app.run(port=5000, debug=True)