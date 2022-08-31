from flask import Blueprint,render_template,redirect, url_for,request,flash
from werkzeug.security import generate_password_hash, check_password_hash
from .models import User
from . import db
from flask_login import login_user, logout_user, login_required

auth= Blueprint('auth',__name__)

#voxel_admin
#voxelteam22@gmail.com
#voxel_2022

@auth.route('/login', methods=['GET', 'POST'])
def login():

    if request.method == 'POST':
        print(request.get_data())
        password = request.form['password']
        username = request.form['username']

        user = User.query.filter_by(username=username).first()

        if not user or not check_password_hash(user.password, password): #if doesn't exist in the db
            flash('Please check your login details and try again')
            return redirect(url_for('auth.login'))

        login_user(user)
        return redirect(url_for('main.dashboard'))# if pass the check then  have credentials 

    return render_template('public/login.html')

    
@auth.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for('main.index'))

@auth.route('/signup', methods=['GET', 'POST'])
def signup():
    error = None
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        username = request.form['username']
        
        user = User.query.filter_by(email=email).first() 
        
        if user: # if a user is found, we want to redirect back to signup page so user can try again
            error = "User already exists"
            return render_template('public/signup.html', error=error)
        
        if password is not None:
            # create a new user with the form data. Hash the password so the plaintext version isn't saved.
            new_user = User(email=email, username=username, password=generate_password_hash(password, method='sha256'))

            # add the new user to the database
            db.session.add(new_user)
            db.session.commit()
            return redirect(url_for('auth.login'))

    return render_template('public/signup.html', error=error)
