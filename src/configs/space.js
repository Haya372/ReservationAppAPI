export default {
  name: {
    size: 8,
    required: true,
    component: 'text',
    props: {
      fullWidth: true,
      notNull: true,
      label: "場所名"
    }
  },
  capacity: {
    size: 4,
    required: true,
    component: 'number',
    props: {
      min: '0',
      label: '最大人数',
    }
  },
  description: {
    size: 12,
    component: 'textmulti',
    props: {
      fullWidth: true,
      label: "詳細"
    },
    type: 'string',
  },
  rule: {
    size: 12,
    component: 'textmulti',
    props: {
      fullWidth: true,
      label: "ルール"
    },
    type: 'string',
  },
}