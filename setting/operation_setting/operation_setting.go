package operation_setting

import "strings"

var DemoSiteEnabled = false
var SelfUseModeEnabled = false

// DisallowUnsetRatioModelEnabled 为 true 时，未在站点已保存的 ModelPrice/ModelRatio 映射中配置的模型不可调用，
// 且不出现在模型广场与 OpenAI 兼容模型列表（与「未设置价格模型」页判定一致）；优先级高于自用模式与个人「接受未设置价格模型」。
var DisallowUnsetRatioModelEnabled = false

var AutomaticDisableKeywords = []string{
	"Your credit balance is too low",
	"This organization has been disabled.",
	"You exceeded your current quota",
	"Permission denied",
	"The security token included in the request is invalid",
	"Operation not allowed",
	"Your account is not authorized",
}

func AutomaticDisableKeywordsToString() string {
	return strings.Join(AutomaticDisableKeywords, "\n")
}

func AutomaticDisableKeywordsFromString(s string) {
	AutomaticDisableKeywords = []string{}
	ak := strings.Split(s, "\n")
	for _, k := range ak {
		k = strings.TrimSpace(k)
		k = strings.ToLower(k)
		if k != "" {
			AutomaticDisableKeywords = append(AutomaticDisableKeywords, k)
		}
	}
}
