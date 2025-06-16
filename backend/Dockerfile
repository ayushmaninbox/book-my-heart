FROM alpine:latest

ARG PB_VERSION=0.19.0

RUN apk add --no-cache \
    unzip \
    ca-certificates

# Download and install PocketBase
ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/
RUN chmod +x /pb/pocketbase

# Copy hooks (always exists)
COPY pb_hooks /pb/pb_hooks

# Copy migrations if they exist, create empty directory if not
COPY pb_migrations* /pb/pb_migrations/
RUN mkdir -p /pb/pb_migrations

# Create pb_data directory
RUN mkdir -p /pb_data

EXPOSE 8080

# Start PocketBase with proper data directory
CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8080", "--dir=/pb_data"]