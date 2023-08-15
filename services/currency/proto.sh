#!/bin/bash

# Specify the input directory containing .proto files
input_dir="../../proto"

# Specify the output directory for generated Go code
output_dir="./generated"

# Generate Go code from currency.proto
protoc --go_out="$output_dir" --go-grpc_out="$output_dir" --proto_path="$input_dir" "$input_dir/currency.proto"
