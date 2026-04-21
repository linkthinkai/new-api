FRONTEND_DIR := ./web
BACKEND_DIR := .
VERSION_FILE := VERSION
VERSION := $(shell tr -d '\n\r' < $(VERSION_FILE) 2>/dev/null || echo dev)

BINARY_NAME := new-api
BUILD_DIR := ./build
# 与 Dockerfile 一致：注入版本、strip 调试符号以减小体积
LDFLAGS := -s -w -X 'github.com/QuantumNous/new-api/common.Version=$(VERSION)'

# Linux 交叉编译：make build-linux GOARCH=arm64（GOOS 固定为 linux）
GOARCH ?= amd64
LINUX_BIN := $(BUILD_DIR)/$(BINARY_NAME)-linux-$(GOARCH)

.PHONY: all build-frontend start-backend build-linux clean

all: build-frontend start-backend

build-frontend:
	@echo "Building frontend..."
	@cd $(FRONTEND_DIR) && bun install && \
		DISABLE_ESLINT_PLUGIN=true VITE_REACT_APP_VERSION=$(VERSION) bun run build

start-backend:
	@echo "Starting backend dev server..."
	@cd $(BACKEND_DIR) && go run main.go &

# 先打前端产物（嵌入 web/dist），再编译 Linux 可执行文件；可在 macOS/Windows 上交叉编译
build-linux: build-frontend
	@echo "Building $(LINUX_BIN) (linux/$(GOARCH))..."
	@mkdir -p $(BUILD_DIR)
	@cd $(BACKEND_DIR) && \
		CGO_ENABLED=0 GOOS=linux GOARCH=$(GOARCH) \
		go build -trimpath -ldflags "$(LDFLAGS)" -o $(LINUX_BIN)
	@echo "Done: $(LINUX_BIN)"

clean:
	@rm -rf $(BUILD_DIR)
	@rm -rf $(FRONTEND_DIR)/dist
