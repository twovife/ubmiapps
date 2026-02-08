// resources/js/dayjsConfig.js
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';

// Extend dayjs dengan plugin updateLocale
dayjs.extend(updateLocale);

// Update locale 'en' dengan nama hari dalam bahasa Indonesia
dayjs.updateLocale('en', {
  weekdays: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
});

dayjs.updateLocale('en', {
  months: [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Augustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ],
});

// Mengatur locale menjadi 'en' secara global
dayjs.locale('en');

export default dayjs;
