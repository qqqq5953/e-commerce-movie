import emitter from '@/methods/emitter';

export default function (response, item, action) {
  function emitContent(style, status, content) {
    emitter.emit('push-message', {
      title: item.title,
      style,
      status,
      content
    });
  }

  const message = typeof response.data.message === 'string' ? [response.data.message] : response.data.message;

  if (response.data.success) {
    emitContent('success', `${action}成功`);
    return;
  };
  emitContent('danger', `${action}失敗`, message.join('、'));
}
