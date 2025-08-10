from flask_login import UserMixin

class User(UserMixin):
    def __init__(self, user_dict):
        self.id = str(user_dict["_id"])
        self.email = user_dict["email"]
