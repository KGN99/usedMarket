FROM python:3
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /back
COPY ./requirements.txt /back/
RUN pip install -r requirements.txt
COPY ./ ./