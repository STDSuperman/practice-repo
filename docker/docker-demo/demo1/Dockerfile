FROM python:3.6
ADD . /code
WORKDIR /code
RUN pip install flask redis
CMD ["python", "app.py"]