FROM alpine:3.2

RUN apk update && apk --update add ruby ruby-irb ruby-json ruby-rake \
    ruby-bigdecimal ruby-io-console libstdc++ tzdata postgresql-client nodejs \
    libxml2-dev libxslt-dev

ADD Gemfile /app/
ADD Gemfile.lock /app/

RUN apk --update add --virtual build-dependencies build-base ruby-dev openssl-dev \
    postgresql-dev libc-dev linux-headers && \
    gem install bundler && gem install nokogiri -- --use-system-libraries && \
    cd /app ; bundle config --global build.nokogiri "--use-system-libraries" ; \
    bundle install --without development test && \
    apk del build-dependencies

ADD . /app

ENV RAILS_ENV production
ENV SECRET_KEY_BASE $(openssl rand -base64 32)
ENV RAILS_SERVE_STATIC_FILES true

WORKDIR /app

EXPOSE 3000