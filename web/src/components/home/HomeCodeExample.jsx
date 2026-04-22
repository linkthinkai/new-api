/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/

import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Button, Radio, RadioGroup } from '@douyinfe/semi-ui';
import { IconCopy } from '@/icons/semiRemix';
import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import php from 'highlight.js/lib/languages/php';
import python from 'highlight.js/lib/languages/python';
import go from 'highlight.js/lib/languages/go';
import java from 'highlight.js/lib/languages/java';
import javascript from 'highlight.js/lib/languages/javascript';
import '../common/markdown/markdown.css';

hljs.registerLanguage('bash', bash);
hljs.registerLanguage('php', php);
hljs.registerLanguage('python', python);
hljs.registerLanguage('go', go);
hljs.registerLanguage('java', java);
hljs.registerLanguage('javascript', javascript);

const CODE_EXAMPLES = [
  {
    id: 'curl',
    labelKey: '首页代码类型_cURL',
    hl: 'bash',
    build: (base) => `curl "${base}/v1/chat/completions" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "model": "gpt-4o-mini",
    "messages": [{ "role": "user", "content": "Hello!" }]
  }'`,
  },
  {
    id: 'php',
    labelKey: '首页代码类型_PHP',
    hl: 'php',
    build: (base) => `<?php

$url = '${base}/v1/chat/completions';
$payload = [
    'model' => 'gpt-4o-mini',
    'messages' => [
        ['role' => 'user', 'content' => 'Hello!'],
    ],
];

$ch = curl_init($url);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'Authorization: Bearer YOUR_API_KEY',
    ],
    CURLOPT_POSTFIELDS => json_encode($payload),
]);

echo curl_exec($ch);
`,
  },
  {
    id: 'python',
    labelKey: '首页代码类型_Python',
    hl: 'python',
    build: (base) => `import requests

url = "${base}/v1/chat/completions"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_API_KEY",
}
payload = {
    "model": "gpt-4o-mini",
    "messages": [
        {"role": "user", "content": "Hello!"},
    ],
}

response = requests.post(url, json=payload, headers=headers)
print(response.text)
`,
  },
  {
    id: 'go',
    labelKey: '首页代码类型_Go',
    hl: 'go',
    build: (base) => `package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

func main() {
	url := "${base}/v1/chat/completions"
	body := map[string]any{
		"model": "gpt-4o-mini",
		"messages": []map[string]string{
			{"role": "user", "content": "Hello!"},
		},
	}
	b, err := json.Marshal(body)
	if err != nil {
		panic(err)
	}
	req, err := http.NewRequest(http.MethodPost, url, bytes.NewReader(b))
	if err != nil {
		panic(err)
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer YOUR_API_KEY")
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()
	out, _ := io.ReadAll(resp.Body)
	fmt.Println(string(out))
}
`,
  },
  {
    id: 'java',
    labelKey: '首页代码类型_Java',
    hl: 'java',
    build: (base) => {
      const json = JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: 'Hello!' }],
      });
      const javaBodyValue = json.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
      return `import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

public class Main {
  public static void main(String[] args) throws Exception {
    String url = "${base}/v1/chat/completions";
    String body = "${javaBodyValue}";
    HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create(url))
        .header("Content-Type", "application/json")
        .header("Authorization", "Bearer YOUR_API_KEY")
        .timeout(Duration.ofSeconds(30))
        .POST(HttpRequest.BodyPublishers.ofString(body))
        .build();
    HttpClient client = HttpClient.newBuilder()
        .connectTimeout(Duration.ofSeconds(10))
        .build();
    HttpResponse<String> response = client.send(
        request,
        HttpResponse.BodyHandlers.ofString()
    );
    System.out.println(response.body());
  }
}
`;
    },
  },
  {
    id: 'axios',
    labelKey: '首页代码类型_Axios',
    hl: 'javascript',
    build: (base) => `import axios from 'axios';

const url = '${base}/v1/chat/completions';

axios
  .post(
    url,
    {
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: 'Hello!' }],
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer YOUR_API_KEY',
      },
    },
  )
  .then((res) => {
    console.log(res.data);
  });
`,
  },
];

const HomeCodeExample = ({
  t,
  serverAddress,
  reduceMotion,
  easeSmooth,
  onCopySnippet,
}) => {
  const [codeKind, setCodeKind] = useState('curl');

  const { snippet, highlightLang } = useMemo(() => {
    const base = serverAddress.replace(/\/$/, '');
    const ex = CODE_EXAMPLES.find((item) => item.id === codeKind) || CODE_EXAMPLES[0];
    return { snippet: ex.build(base), highlightLang: ex.hl };
  }, [serverAddress, codeKind]);

  const lineHtmls = useMemo(() => {
    const { value } = hljs.highlight(snippet, {
      language: highlightLang,
      ignoreIllegals: true,
    });
    return value.split('\n');
  }, [snippet, highlightLang]);

  return (
    <motion.section
      aria-labelledby='home-code-title'
      className='neo-home-section border-b border-[var(--glass-border)]'
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-64px' }}
      transition={
        reduceMotion ? { duration: 0 } : { duration: 0.52, ease: easeSmooth }
      }
    >
      <div className='neo-home-section-inner'>
        <header className='neo-home-section-head'>
          <h2 id='home-code-title' className='neo-home-section-title'>
            {t('首页代码示例标题')}
          </h2>
          <p className='neo-home-section-subtitle'>{t('首页代码示例说明')}</p>
        </header>

        <figure className='neo-home-code-panel m-0'>
          <figcaption className='neo-home-code-toolbar !flex-col !items-stretch gap-3 sm:!flex-row sm:!items-center sm:!justify-between'>
            <div className='neo-home-code-toolbar__tabs min-w-0 w-full sm:flex-1 overflow-x-auto pb-0.5 sm:pb-0 -mx-0.5 px-0.5'>
              <RadioGroup
                type='button'
                size='small'
                value={codeKind}
                onChange={(e) => setCodeKind(e.target.value)}
                className='!inline-flex w-max !flex-nowrap'
                name='home-code-example-lang'
              >
                {CODE_EXAMPLES.map((item) => (
                  <Radio value={item.id} key={item.id}>
                    {t(item.labelKey)}
                  </Radio>
                ))}
              </RadioGroup>
            </div>
            <div className='flex shrink-0 items-center justify-end gap-3'>
              <span
                className='hidden font-mono text-[11px] uppercase tracking-widest text-semi-color-text-2 sm:inline'
                aria-hidden
              >
                post /v1/chat/completions
              </span>
              <Button
                size='small'
                type='tertiary'
                theme='borderless'
                icon={<IconCopy aria-hidden />}
                className='!rounded-md'
                aria-label={t('首页代码一键复制')}
                onClick={() => onCopySnippet(snippet)}
              >
                {t('首页代码一键复制')}
              </Button>
            </div>
          </figcaption>
          <div
            className='neo-home-code-block overflow-x-auto p-0'
            role='region'
            aria-label={t('首页代码示例标题')}
          >
            <ol
              className='neo-home-code-lines m-0 p-0'
              start={1}
              key={codeKind}
            >
              {lineHtmls.map((lineHtml, index) => (
                <li key={index} className='neo-home-code-line m-0'>
                  <span className='neo-home-code-lineno' aria-hidden>
                    {index + 1}
                  </span>
                  <code
                    className='hljs neo-home-code-line-tokens'
                    dangerouslySetInnerHTML={{
                      __html: lineHtml || '&#160;',
                    }}
                  />
                </li>
              ))}
            </ol>
          </div>
        </figure>
      </div>
    </motion.section>
  );
};

export default HomeCodeExample;
