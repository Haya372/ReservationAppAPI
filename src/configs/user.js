export default {
  name: {
    size: 12,
    required: true,
    component: 'text',
    props: {
      fullWidth: true,
      notNull: true,
      label: "名前",
      disabled: true
    }
  },
  kana: {
    size: 12,
    required: true,
    component: 'text',
    props: {
      fullWidth: true,
      notNull: true,
      label: "ふりがな",
      disabled: true
    }
  },
  email: {
    size: 12,
    required: true,
    component: 'text',
    props: {
      fullWidth: true,
      notNull: true,
      label: "メールアドレス",
      disabled: true
    }
  },
  role: {
    size: 4,
    required: true,
    type: 'array',
    component: 'checkbox',
    props: {
      items: [
        {
          label: "CREATE",
          value: "create"
        },
        {
          label: "UPDATE",
          value: "update"
        },
        {
          label: "READ",
          value: "read"
        },
        {
          label: "DELETE",
          value: "delete"
        },
      ],
      label: "権限"
    }
  }
}