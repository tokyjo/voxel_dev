import time
import cv2 as cv 
from datetime import datetime
from cv2 import FONT_HERSHEY_COMPLEX 

def rescale_frame(frame, scale =0.75):
    width = int(frame .shape[1]* scale)
    height= int(frame.shape[0]* scale)
    dim = (width,height)
    return cv.resize(frame, dim, interpolation = cv.INTER_AREA)

def description(frame,text):
    return cv.putText(frame,str(text),(200,320),FONT_HERSHEY_COMPLEX,fontScale=1.0,color=(0,48,73),thickness=2)

class Camera(object):
    def __init__(self,id=0,resolution=(1920,1280),file_type= ".jpg",photo_name="photo",fps=5):
        self.vs = cv.VideoCapture(id) # streaming 
        self.file_type = file_type # file type 
        self.photo_name= photo_name  # record of the photo
        self.vs.set(3,resolution[0]) # width
        self.vs.set(4,resolution[1]) # heigth
        self.vs.set(5,fps) #fps
        # self.vs.set(7,15) #frame_rate

    def is_thorlab(self):
            return False

    def get_picture(self):
        ret, frame = self.vs.read()
        today_date = datetime.now().strftime("%m%d%Y-%H%M%S") # get current time 
        frame = description (frame,today_date) # label photo
        cv.imwrite(str(self.photo_name +"_"+self.file_type),frame)


    def get_frame(self):
        ret, frame = self.vs.read()
        if ret:
            rescaled_frame=rescale_frame(frame,0.25)
            ret, jpeg = cv.imencode(self.file_type,rescaled_frame)
            return jpeg.tobytes()
        # return frame
    
        