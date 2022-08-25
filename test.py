import cv2 as cv

def cam_open(i):
	cam=cv.VideoCapture(i)
	if cam.isOpened() :
		print(f'the cam {i} was opened\n')
		cam.release()
	else :
		print(f'Camera not opened\n')

if __name__=="__main__":
	cam1=cam_open(2)
	cam2=cam_open(4)
     

