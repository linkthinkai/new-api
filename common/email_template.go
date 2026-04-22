package common

import (
	"html"
	"strconv"
	"strings"
	"unicode/utf8"
)

const emailBaseFont = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif"
const emailMonoFont = "ui-monospace,SFMono-Regular,'SF Mono',Menlo,Consolas,monospace"

// emailShell 统一邮件外框：预读摘要、顶栏、标题、副标题、正文区
func emailShell(preheader, headline, subtitle, innerBodyHTML string) string {
	head := html.EscapeString(strings.TrimSpace(headline))
	sub := strings.TrimSpace(subtitle)
	pre := html.EscapeString(preheader)
	var subBlock string
	if sub != "" {
		subBlock = `<p style="margin:0 0 24px 0;font-size:14px;line-height:1.55;color:#64748b;">` + html.EscapeString(sub) + `</p>`
	}
	return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>` + head + `</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">` + pre + `</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background-color:#f1f5f9;">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" width="100%" style="max-width:560px;border-collapse:collapse;">
        <tr>
          <td style="padding:0 0 20px 0;text-align:center;">
            <span style="font-size:13px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#64748b;">` + html.EscapeString(SystemName) + `</span>
          </td>
        </tr>
        <tr>
          <td style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(15,23,42,0.08);border:1px solid #e2e8f0;">
            <div style="height:4px;background:linear-gradient(90deg,#2563eb 0%,#4f46e5 50%,#7c3aed 100%);"></div>
            <div style="padding:28px 28px 8px 28px;">
              <h1 style="margin:0 0 8px 0;font-size:20px;font-weight:700;line-height:1.35;color:#0f172a;font-family:` + emailBaseFont + `;">` + head + `</h1>
              ` + subBlock + `
            </div>
            <div style="padding:0 28px 28px 28px;font-family:` + emailBaseFont + `;color:#334155;">
` + innerBodyHTML + `
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 8px 0 8px;text-align:center;">
            <p style="margin:0;font-size:12px;line-height:1.5;color:#94a3b8;">本邮件由 ` + html.EscapeString(SystemName) + ` 自动发送，请勿直接回复。</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`
}

// WrapTransactionVerificationEmail 邮箱验证 HTML 正文
func WrapTransactionVerificationEmail(verificationCode string, validMinutes int) string {
	code := html.EscapeString(verificationCode)
	minStr := strconv.Itoa(validMinutes)
	pre := "您的邮箱验证码是 " + verificationCode
	inner := `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
  <tr>
    <td style="padding:0 0 4px 0;">
      <p style="margin:0 0 8px 0;font-size:15px;line-height:1.6;color:#334155;">您好，</p>
      <p style="margin:0 0 20px 0;font-size:15px;line-height:1.6;color:#334155;">您正在进行 <strong style="color:#0f172a;">` + html.EscapeString(SystemName) + `</strong> 的邮箱验证，请在页面中输入下方验证码。</p>
      <div style="text-align:center;padding:22px 16px;border-radius:14px;background:linear-gradient(160deg,#f8fafc 0%,#eff6ff 45%,#eef2ff 100%);border:1px solid #e2e8f0;">
        <p style="margin:0 0 10px 0;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#64748b;font-weight:600;">验证码</p>
        <p style="margin:0;font-size:34px;font-weight:800;letter-spacing:0.2em;font-family:` + emailMonoFont + `;color:#1e40af;">` + code + `</p>
      </div>
      <p style="margin:20px 0 0 0;font-size:13px;line-height:1.55;color:#64748b;">验证码在 <strong style="color:#334155;">` + minStr + `</strong> 分钟内有效。请勿向他人透露验证码。如非本人操作，请忽略本邮件。</p>
    </td>
  </tr>
</table>`
	return emailShell(pre, "邮箱验证", "为完成身份验证，请使用下方数字。", inner)
}

// WrapTransactionPasswordResetEmail 密码重置 HTML 正文
func WrapTransactionPasswordResetEmail(resetURL string, validMinutes int) string {
	u := html.EscapeString(resetURL)
	minStr := strconv.Itoa(validMinutes)
	inner := `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
  <tr>
    <td style="padding:0 0 4px 0;">
      <p style="margin:0 0 8px 0;font-size:15px;line-height:1.6;color:#334155;">您好，</p>
      <p style="margin:0 0 22px 0;font-size:15px;line-height:1.6;color:#334155;">我们收到对 <strong style="color:#0f172a;">` + html.EscapeString(SystemName) + `</strong> 账户的密码重置请求。点击下方按钮继续；若未发起该请求，请忽略。</p>
      <div style="text-align:center;padding:6px 0 24px 0;">
        <a href="` + u + `" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:15px 32px;border-radius:11px;font-size:15px;font-weight:600;text-decoration:none;color:#ffffff !important;background:linear-gradient(135deg,#2563eb 0%,#1d4ed8 100%);box-shadow:0 4px 16px rgba(37,99,235,0.35);">重置密码</a>
      </div>
      <p style="margin:0 0 8px 0;font-size:13px;line-height:1.5;color:#64748b;">若按钮无响应，请将链接复制到浏览器打开：</p>
      <p style="margin:0 0 20px 0;word-break:break-all;font-size:12px;line-height:1.6;font-family:` + emailMonoFont + `;color:#475569;padding:12px 14px;background:#f8fafc;border-radius:10px;border:1px solid #e2e8f0;">` + u + `</p>
      <p style="margin:0;font-size:13px;color:#94a3b8;">该链接在 <strong style="color:#64748b;">` + minStr + `</strong> 分钟内有效。</p>
    </td>
  </tr>
</table>`
	return emailShell("重置 " + SystemName + " 账户密码", "密码重置", "点击按钮完成安全验证，保护您的账户。", inner)
}

// WrapUserNotificationEmail 系统通知类邮件（额度/通道/上游等），正文可为内部生成的 HTML 或纯文本
func WrapUserNotificationEmail(notificationTitle, body string) string {
	pre := firstLineAsPreheader(notificationTitle, body)
	headline := strings.TrimSpace(notificationTitle)
	if headline == "" {
		headline = "系统通知"
	}
	inner := formatNotificationBodyForEmail(body)
	return emailShell(pre, headline, "以下为本次通知的完整内容。", inner)
}

func firstLineAsPreheader(title, body string) string {
	if t := strings.TrimSpace(title); t != "" && utf8.RuneCountInString(t) <= 100 {
		return t
	}
	if strings.Contains(body, "<") {
		if ts := strings.TrimSpace(title); ts != "" {
			return ts
		}
		return "系统通知"
	}
	s := strings.TrimSpace(body)
	if idx := strings.IndexAny(s, "\r\n"); idx >= 0 {
		s = s[:idx]
	}
	if s == "" {
		return "系统通知"
	}
	runes := []rune(s)
	if len(runes) > 90 {
		return string(runes[:90]) + "…"
	}
	return string(runes)
}

func formatNotificationBodyForEmail(body string) string {
	b := strings.TrimSpace(body)
	if b == "" {
		return `<p style="margin:0;font-size:14px;color:#64748b;">（无内容）</p>`
	}
	if isEmailTrustedHTMLFragment(b) {
		return `<div style="font-size:15px;line-height:1.65;color:#1e293b;">` + b + `</div>`
	}
	return plainTextToEmailHTML(b)
}

func isEmailTrustedHTMLFragment(s string) bool {
	lower := strings.ToLower(s)
	return strings.Contains(lower, "<a ") || strings.Contains(lower, "<br") || strings.Contains(lower, "<p") || strings.Contains(lower, "<div")
}

// plainTextToEmailHTML 多段与列表排版（上游巡检等长文本）
func plainTextToEmailHTML(plain string) string {
	plain = strings.ReplaceAll(plain, "\r\n", "\n")
	sections := strings.Split(plain, "\n\n")
	var out strings.Builder
	for _, sec := range sections {
		sec = strings.TrimSpace(sec)
		if sec == "" {
			continue
		}
		lines := strings.Split(sec, "\n")
		var buf strings.Builder
		var inList bool
		for i, line := range lines {
			line = strings.TrimRight(line, " \t")
			trim := strings.TrimSpace(line)
			if strings.HasPrefix(trim, "- ") {
				if !inList {
					if buf.Len() > 0 {
						out.WriteString(`<p style="margin:0 0 12px 0;font-size:15px;line-height:1.65;color:#1e293b;">` + buf.String() + `</p>`)
						buf.Reset()
					}
					out.WriteString(`<ul style="margin:0 0 16px 0;padding:0 0 0 20px;font-size:14px;line-height:1.55;color:#334155;">`)
					inList = true
				}
				item := html.EscapeString(strings.TrimPrefix(trim, "- "))
				out.WriteString(`<li style="margin:0 0 5px 0;">` + item + `</li>`)
			} else {
				if inList {
					out.WriteString(`</ul>`)
					inList = false
				}
				if i > 0 && buf.Len() > 0 {
					buf.WriteString("<br/>")
				}
				buf.WriteString(html.EscapeString(trim))
			}
		}
		if inList {
			out.WriteString(`</ul>`)
		}
		if buf.Len() > 0 {
			out.WriteString(`<p style="margin:0 0 16px 0;font-size:15px;line-height:1.65;color:#1e293b;">` + buf.String() + `</p>`)
		}
	}
	s := out.String()
	if s == "" {
		return `<p style="margin:0;font-size:15px;color:#1e293b;">` + html.EscapeString(plain) + `</p>`
	}
	return s
}
