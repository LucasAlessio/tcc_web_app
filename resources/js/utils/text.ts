export const convertMarkupBold2Html = (text: string) => {
    return text.replace(/\*([^*]+)\*/g, '<strong>$1</strong>');
  };
