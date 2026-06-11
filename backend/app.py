from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mysqldb import MySQL
import MySQLdb

app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Root@123'
app.config['MYSQL_DB'] = 'canteen_db'

mysql = MySQL(app)

@app.route('/')
def home():
    return 'Canteen Pre Ordering System API'

@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        name = data['name']
        email = data['email']
        password = data['password']
        
        cursor = mysql.connection.cursor()
        
        # Check duplicate email
        cursor.execute("SELECT * FROM users WHERE email=%s", (email,))
        if cursor.fetchone():
            cursor.close()
            return jsonify({'error': 'Email already registered'}), 400
        
        cursor.execute("INSERT INTO users(name, email, password) VALUES(%s,%s,%s)", 
                       (name, email, password))
        mysql.connection.commit()
        cursor.close()
        return jsonify({'message': 'Registration successful'}), 201
    
    except Exception as e:
        return jsonify({'error': f'Database error: {str(e)}'}), 500

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data['email']
        password = data['password']
        role = data.get('role', 'user')
        
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM users WHERE email=%s", (email,))
        user = cursor.fetchone()
        cursor.close()
        
        if not user:
            return jsonify({'message': 'Please register with this email id'}), 404
        
        # user: id[0], name[1], email[2], password[3]
        if password!= user[3]:
            return jsonify({'message': 'Password is wrong'}), 401
        
        # Admin check - email correct chey
        if role == "admin" and email == "admin@canteen.com":
            return jsonify({
                'message': 'Admin Login Successful', 
                'user_id': user[0],
                'role': 'admin'
            })
        
        return jsonify({
            'message': 'User Login Successful', 
            'user_id': user[0],
            'role': 'user'
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/menu', methods=['GET'])
def get_menu():
    try:
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT id, category, subcategory, food_name, price, image_url FROM food_items")
        rows = cursor.fetchall()
        food_list = []
        for row in rows:
            food = {
                'id': row[0],
                'category': row[1],
                'subcategory': row[2],
                'food_name': row[3],
                'price': float(row[4]),
                'image_url': row[5] # Image URL add chesam
            }
            food_list.append(food)
        cursor.close()
        return jsonify(food_list)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)