export default {
  name: {
    size: 10,
    required: true,
    component: 'text',
    props: {
      fullWidth: true,
      notNull: true,
      label: "団体名"
    },
  },
  public: {
    size: 2,
    component: 'flg',
    props: {
      label: "公開",
    },
    type: 'boolean'
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