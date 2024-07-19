from pymongo import MongoClient
import bcrypt
import re

# MongoDB setup
client = MongoClient('mongodb://localhost:27017/')
db = client['user_db']
users_collection = db['users']

def is_valid_email(email):
    regex = r'^\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    return re.match(regex, email)

def validate_registration(data):
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    # Debug statements
    print(f"Received data: {data}")

    # Basic validations
    if not username or not email or not password:
        print('Validation Error: Missing required fields')
        return {'error': 'Missing required fields'}

    if len(username) < 3:
        print('Validation Error: Username must be at least 3 characters long')
        return {'error': 'Username must be at least 3 characters long'}

    if not is_valid_email(email):
        print('Validation Error: Invalid email address')
        return {'error': 'Invalid email address'}

    if len(password) < 6:
        print('Validation Error: Password must be at least 6 characters long')
        return {'error': 'Password must be at least 6 characters long'}

    if users_collection.find_one({'username': username}):
        print('Validation Error: Username already exists')
        return {'error': 'Username already exists'}

    if users_collection.find_one({'email': email}):
        print('Validation Error: Email already registered')
        return {'error': 'Email already registered'}

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    user_data = {
        'username': username,
        'email': email,
        'password': hashed_password
    }

    try:
        # Insert user data into MongoDB
        result = users_collection.insert_one(user_data)
        print(f"Inserted user data with id: {result.inserted_id}")
        return {'message': 'User registered successfully'}
    except Exception as e:
        print(f"Database insertion error: {e}")
        return {'error': 'Database error. Please try again later'}

def validate_login(data):
    username = data.get('username')
    password = data.get('password')

    # Debug statements
    print(f"Received login data: {data}")

    # Basic validations
    if not username or not password:
        print('Validation Error: Missing required fields')
        return {'error': 'Missing required fields'}

    user = users_collection.find_one({'username': username})
    if not user:
        
        return {'error': 'User Not registered'}

    if not bcrypt.checkpw(password.encode('utf-8'), user['password']):
        
        return {'error': 'Invalid password'}

    return {'message': 'Login successful'}