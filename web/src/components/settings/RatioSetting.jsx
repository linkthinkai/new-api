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

import React, { useEffect, useState } from 'react';
import { Card, Form, Spin, Switch, Tabs, Typography } from '@douyinfe/semi-ui';
import { useTranslation } from 'react-i18next';

import ModelPricingCombined from '../../pages/Setting/Ratio/ModelPricingCombined';
import GroupRatioSettings from '../../pages/Setting/Ratio/GroupRatioSettings';
import ModelRatioNotSetEditor from '../../pages/Setting/Ratio/ModelRationNotSetEditor';
import UpstreamRatioSync from '../../pages/Setting/Ratio/UpstreamRatioSync';

import { API, showError, showSuccess, toBoolean } from '../../helpers';

const { Text } = Typography;

const RatioSetting = () => {
  const { t } = useTranslation();

  let [inputs, setInputs] = useState({
    ModelPrice: '',
    ModelRatio: '',
    CacheRatio: '',
    CreateCacheRatio: '',
    CompletionRatio: '',
    GroupRatio: '',
    GroupGroupRatio: '',
    ImageRatio: '',
    AudioRatio: '',
    AudioCompletionRatio: '',
    AutoGroups: '',
    DefaultUseAutoGroup: false,
    ExposeRatioEnabled: false,
    UserUsableGroups: '',
    'group_ratio_setting.group_special_usable_group': '',
  });

  const [loading, setLoading] = useState(false);

  const getOptions = async () => {
    const res = await API.get('/api/option/');
    const { success, message, data } = res.data;
    if (success) {
      let newInputs = {};
      data.forEach((item) => {
        if (item.value.startsWith('{') || item.value.startsWith('[')) {
          try {
            item.value = JSON.stringify(JSON.parse(item.value), null, 2);
          } catch (e) {
            // 如果后端返回的不是合法 JSON，直接展示
          }
        }
        if (
          [
            'DefaultUseAutoGroup',
            'ExposeRatioEnabled',
            'DisallowUnsetRatioModelEnabled',
          ].includes(item.key)
        ) {
          newInputs[item.key] = toBoolean(item.value);
        } else {
          newInputs[item.key] = item.value;
        }
      });
      setInputs(newInputs);
    } else {
      showError(message);
    }
  };

  const onRefresh = async () => {
    try {
      setLoading(true);
      await getOptions();
    } catch (error) {
      showError('刷新失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    onRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDisallowUnsetChange = (checked) => {
    setInputs((prev) => ({ ...prev, DisallowUnsetRatioModelEnabled: checked }));
    API.put('/api/option/', {
      key: 'DisallowUnsetRatioModelEnabled',
      value: String(checked),
    })
      .then((res) => {
        const { success, message } = res.data || {};
        if (success) {
          showSuccess(t('保存成功'));
          onRefresh();
        } else {
          showError(message || t('保存失败'));
        }
      })
      .catch(() => {
        showError(t('保存失败'));
      });
  };

  return (
    <Spin spinning={loading} size='large'>
      <Card style={{ marginTop: '10px' }}>
        <div style={{ marginBottom: 16, padding: '4px 4px 0' }}>
          <Form layout='vertical'>
            <Form.Slot label={t('禁止未定价模型调用与展示')}>
              <Switch
                checked={toBoolean(inputs.DisallowUnsetRatioModelEnabled)}
                onChange={onDisallowUnsetChange}
              />
            </Form.Slot>
          </Form>
          <Text
            type='tertiary'
            size='small'
            style={{ display: 'block', marginTop: 4, lineHeight: 1.6 }}
          >
            {t('禁止未定价模型调用与展示说明')}
          </Text>
        </div>
        <Tabs type='card' defaultActiveKey='pricing'>
          <Tabs.TabPane tab={t('模型定价设置')} itemKey='pricing'>
            <ModelPricingCombined options={inputs} refresh={onRefresh} />
          </Tabs.TabPane>
          <Tabs.TabPane tab={t('分组相关设置')} itemKey='group'>
            <GroupRatioSettings options={inputs} refresh={onRefresh} />
          </Tabs.TabPane>
          <Tabs.TabPane tab={t('未设置价格模型')} itemKey='unset_models'>
            <ModelRatioNotSetEditor options={inputs} refresh={onRefresh} />
          </Tabs.TabPane>
          <Tabs.TabPane tab={t('上游倍率同步')} itemKey='upstream_sync'>
            <UpstreamRatioSync options={inputs} refresh={onRefresh} />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </Spin>
  );
};

export default RatioSetting;
