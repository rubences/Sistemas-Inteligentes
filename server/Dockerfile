FROM python:3.12-slim
RUN useradd --uid 10001 --create-home classroom && mkdir /data /private && chown classroom:classroom /data /private
WORKDIR /app
COPY app.py /app/app.py
USER classroom
ENV CLASSROOM_HOST=0.0.0.0 CLASSROOM_PORT=8787 CLASSROOM_DB=/data/class.db CLASSROOM_PRIVATE_DIR=/private
EXPOSE 8787
CMD ["python", "-u", "app.py"]
