export default {
  space_name: {
    size: 12,
    required: true,
    component: 'text',
    props: {
      fullWidth: true,
      notNull: true,
      label: "場所名"
    }
  },
  numbers: {
    size: 4,
    required: true,
    component: 'number',
    props: {
      label: '人数',
      fullWidth: true
    }
  },
  user_id: {
    size: 2,
    required: true,
    component: 'user',
    props: {
      label: '予約者',
    }
  },
  users: {
    size: 6,
    component: 'user',
    props: {
      label: '参加者',
    }
  },
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