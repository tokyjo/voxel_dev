import cv2 as cv

cam=cv.VideoCapture(0)
cam.set(3,480)
cam.set(4,320)
cam.set(5,10)
while True:
    ret,frame= cam.read()
    if ret:
        cv.imshow('video',frame)
        if cv.waitKey(20) & 0xFF==ord("d"):
            break
        
cam.release()
cv.destroyAllWindows()
