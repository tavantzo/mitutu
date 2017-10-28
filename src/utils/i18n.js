import DeviceInfo from 'react-native-device-info';
import i18n from 'react-native-i18n';

import translations from '../../assets/translations';

i18n.local = DeviceInfo.getDeviceLocale();
i18n.fallbacks = true;
i18n.translations = translations;
i18n.missingBehaviour = 'guess';

export default i18n;

