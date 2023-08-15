# Use an official Go image as the base image
FROM golang:1.21

# Set the working directory within the container
WORKDIR /services/currency

COPY go.mod go.sum ./
RUN go mod download

# Copy the source code to the container
COPY . .

# Build the Go application
RUN go build -o ./bin/currency

# Expose the port that your application will listen on
EXPOSE 3001

# Command to run your application
CMD ["./bin/currency"]
