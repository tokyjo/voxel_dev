#from app import app
from . import db
import cv2 as cv
from random import randint
from datetime import datetime
from app.camera import Camera
#from w1thermsensor import W1ThermSensor
#from ThorlabsPM100 import ThorlabsPM100,USBTMC
from flask import Blueprint, Response,render_template,jsonify
from flask_login import login_required, current_user

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return render_template("public/index.html")

@main.route('/profile')
# @login_required
def profile():
    return render_template("public/profile.html")

#init_sensor


#for production
# inst=USBTMC(device="/dev/usbtmc0")
# pmd100 = ThorlabsPM100(inst=inst)
# inst.timeout=None

# index=-1
# sensor = W1ThermSensor()



@main.route("/about")
def about():
    return render_template("public/about.html")

@main.route("/tutorial")
def tutorial():
    return render_template("admin/tutorial.html")



@main.route("/dashboard")
def dashboard():
    return render_template("admin/dashboard.html")

@main.route('/_sensors', methods=['GET'])
def get_data():
    date =datetime.now().strftime("%H:%M:%S")
   
    # Uncomment for production:
    # power = float( pmd100.read*(10**6)) 
    # temp= float(sensor.get_temperature())
    # for dev:
    power= randint(0,10)
    temp = randint(0,10)
        
    to_json_data= {
        "power": power,
        "temp" : temp,
        "date":date
    }
    return jsonify(to_json_data)

"""
@main.route('/video_feed/<id>/')
def video_feed(id):
    return Response(gen_frames(id),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

def gen_frames(id):
    cam=Camera(id)
    cam.set(3,480)
    cam.set(4,320)
    cam.set(5,10)
    while True:
        ret,frame=cam.read()
        if ret:
            ret,jpeg=cv.imencode('.jpg',frame)
            frame=jpeg.tobytes()
            yield(b'--frame\r\n'
            b'Contet-Type : image/jpeg \r\n\r\n'+frame+b'\r\n\r\n')
"""


def gen(camera):
    while True:
        frame = camera.get_frame()
        yield(b'--frame\r\n'
        b'Content-Type : image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

@main.route('/video_feed_0')
def video_feed_0():
    cam=Camera(0)
    return Response(gen(cam),
                     mimetype='multipart/x-mixed-replace; boundary=frame')

@main.route('/video_feed_1')
def video_feed_1():
    cam=Camera(4)
    return Response(gen(cam),
                     mimetype='multipart/x-mixed-replace; boundary=frame')

    
    
    