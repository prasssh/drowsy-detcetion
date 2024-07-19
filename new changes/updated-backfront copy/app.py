from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import cv2
import os
from keras.models import load_model
import numpy as np
from pygame import mixer
from Validate import validate_registration, validate_login

app = Flask(__name__)
CORS(app)  # Enable CORS

mixer.init()
sound = mixer.Sound('sound.wav')

face = cv2.CascadeClassifier('haarcascade-files/haarcascade_frontalface_alt.xml')
leye = cv2.CascadeClassifier('haarcascade-files/haarcascade_lefteye_2splits.xml')
reye = cv2.CascadeClassifier('haarcascade-files/haarcascade_righteye_2splits.xml')

lbl=['Close','Open']
model = load_model('trainedmodel.h5')
path = os.getcwd()

def generate_frames():
    cap = cv2.VideoCapture(0)
    font = cv2.FONT_HERSHEY_COMPLEX_SMALL
    count = 0
    score = 0
    thicc = 2

    rpred_class = 1
    lpred_class = 1

    try:
        while True:
            ret, frame = cap.read()
            if not ret:
                print("Failed to capture image")
                break

            height, width = frame.shape[:2]
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

            faces = face.detectMultiScale(gray, minNeighbors=5, scaleFactor=1.1, minSize=(25,25))
            left_eye = leye.detectMultiScale(gray)
            right_eye = reye.detectMultiScale(gray)

            cv2.rectangle(frame, (0, height-50), (200, height), (0,0,0), thickness=cv2.FILLED)

            for (x, y, w, h) in faces:
                cv2.rectangle(frame, (x, y), (x+w, y+h), (100,100,100), 1)

            for (x, y, w, h) in right_eye:
                r_eye = frame[y:y+h, x:x+w]
                r_eye = cv2.cvtColor(r_eye, cv2.COLOR_BGR2GRAY)
                r_eye = cv2.resize(r_eye, (24,24))
                r_eye = r_eye/255.0
                r_eye = r_eye.reshape(24,24,-1)
                r_eye = np.expand_dims(r_eye, axis=0)
                rpred = model.predict(r_eye)
                rpred_class = np.argmax(rpred)
                break

            for (x, y, w, h) in left_eye:
                l_eye = frame[y:y+h, x:x+w]
                l_eye = cv2.cvtColor(l_eye, cv2.COLOR_BGR2GRAY)
                l_eye = cv2.resize(l_eye, (24,24))
                l_eye = l_eye/255
                l_eye = l_eye.reshape(24,24,-1)
                l_eye = np.expand_dims(l_eye, axis=0)
                lpred = model.predict(l_eye)
                lpred_class = np.argmax(lpred)
                break

            if rpred_class == 0 and lpred_class == 0:
                score += 1
                cv2.putText(frame, "Sleepy!", (10, height-20), font, 1, (255,255,255), 1, cv2.LINE_AA)
            else:
                score -= 1
                cv2.putText(frame, "Alert", (10, height-20), font, 1, (255,255,255), 1, cv2.LINE_AA)

            if score < 0:
                score = 0

            cv2.putText(frame, 'Score:' + str(score), (100, height-20), font, 1, (255,255,255), 1, cv2.LINE_AA)
            if score > 15:
                cv2.imwrite(os.path.join(path, 'image.jpg'), frame)
                try:
                    sound.play()
                except:
                    pass
                if thicc < 16:
                    thicc += 2
                else:
                    thicc -= 2
                    if thicc < 2:
                        thicc = 2
                cv2.rectangle(frame, (0,0), (width, height), (0,0,255), thicc)

            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    except Exception as e:
        print(f"An error has occurred: {e}")

    finally:
        cap.release()
        cv2.destroyAllWindows()
        mixer.quit()

# Routing registration
@app.route('/register', methods=['POST'])
def register():
    if request.is_json:
        data = request.get_json()
        result = validate_registration(data)
        if 'error' in result:
            return jsonify(result), 400
        else:
            return jsonify(result), 201
    else:
        return jsonify({'error': 'Content-Type must be application/json'}), 415

# Routing for login
@app.route('/login', methods=['POST'])
def login():
    if request.is_json:
        data = request.get_json()
        result = validate_login(data)
        if 'error' in result:
            return jsonify(result), 401
        else:
            return jsonify(result), 200
    else:
        return jsonify({'error': 'Content-Type must be application/json'}), 415


@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


if __name__ == "__main__":
    app.run(debug=True)

