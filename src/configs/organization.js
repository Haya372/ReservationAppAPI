export default {
  public: {
    size: 2,
    component: 'text',
  },
  name: {
    size: 12,
    required: true,
    component: 'text',
    props: {
      fullWidth: true,
      notNull: true,
      label: "団体名"
    },
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