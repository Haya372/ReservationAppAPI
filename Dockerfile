FROM ruby:3.0.0

RUN apt-get update -qq
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs postgresql-client cron
RUN npm install npm@latest -g
RUN mkdir /myapp
WORKDIR /myapp
ENV TZ Asia/Tokyo
COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock
RUN bundle install

COPY . /myapp

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000
RUN bundle exec whenever --update-crontab

# Start the main process.
CMD ["npm", "run", "start"]