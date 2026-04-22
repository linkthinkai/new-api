package common

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"
)

// ResolveFrontendDistDir 返回前端构建产物目录（内含 index.html）。
// 解析顺序：FRONTEND_DIST → 可执行文件所在目录下的 dist → 当前工作目录下的 web/dist → dist。
func ResolveFrontendDistDir() (string, error) {
	if p := strings.TrimSpace(os.Getenv("FRONTEND_DIST")); p != "" {
		abs, err := filepath.Abs(p)
		if err != nil {
			return "", err
		}
		if err := verifyFrontendDist(abs); err != nil {
			return "", fmt.Errorf("FRONTEND_DIST=%s: %w", p, err)
		}
		return abs, nil
	}

	exe, err := os.Executable()
	if err == nil {
		exe, err = filepath.EvalSymlinks(exe)
		if err != nil {
			exe, _ = os.Executable()
		}
		cand := filepath.Join(filepath.Dir(exe), "dist")
		if err := verifyFrontendDist(cand); err == nil {
			return filepath.Abs(cand)
		}
	}

	for _, rel := range []string{"web/dist", "dist"} {
		if err := verifyFrontendDist(rel); err == nil {
			return filepath.Abs(rel)
		}
	}

	return "", fmt.Errorf("未找到前端静态资源：请设置 FRONTEND_DIST，或将包含 index.html 的 dist 目录放在可执行文件同目录，或在项目根目录保留 web/dist")
}

func verifyFrontendDist(dir string) error {
	st, err := os.Stat(filepath.Join(dir, "index.html"))
	if err != nil {
		return err
	}
	if st.IsDir() {
		return fmt.Errorf("index.html 是目录")
	}
	return nil
}
