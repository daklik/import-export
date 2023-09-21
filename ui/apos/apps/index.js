export default () => {
  let ready = false;

  apos.util.onReady(() => {
    if (!ready) {
      ready = true;
      apos.bus.$on('export-download', openUrl);
      apos.bus.$on('import-duplicates', handleDuplicates);
    }
  });

  function openUrl(event) {
    if (event.url) {
      window.open(event.url, '_blank');
    }
  }

  function handleDuplicates(event) {
    if (!event.duplicatedDocs.length) {
      return;
    }

    apos.modal.execute('AposDuplicateImportModal', {
      docs: event.duplicatedDocs,
      type: event.type,
      exportPath: event.exportPath
    });
  }

  // TODO: Test this to call override method and clean
  // Check if beforeDestory in vue comp works also
  /* onbeforeunload = (event) => {}; */
};
