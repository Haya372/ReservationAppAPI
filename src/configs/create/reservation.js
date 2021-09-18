export default {
  memo: {
    size: 12,
    component: 'textmulti',
    props: {
      fullWidth: true,
      label: "メモ"
    },
    type: 'string',
  },
  start_time: {
    size: 6,
    required: true,
    component: 'datetime',
    props: {
      label: '開始時刻',
      fullWidth: true,
    }
  },
  end_time: {
    size: 6,
    required: true,
    component: 'datetime',
    props: {
      label: '終了時刻',
      fullWidth: true,
    }
  },
}