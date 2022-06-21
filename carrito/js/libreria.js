(async () => {
  const { value: accept } = await Swal.fire({
    title: "Terminos y condiciones",
    input: "checkbox",
    position: "bottom",
    inputValue: 1,
    width: "60%",
    inputPlaceholder: "Estoy de acuerdo con los términos y condiciones",
    confirmButtonText:
      'Continuar <i class="fa fa-arrow-right primary-success"></i>',
    confirmButtonColor: "#198754",
    inputValidator: (result) => {
      return !result && "Tenes que estar de acuerdo con nuestros términos";
    },
  });

  if (accept) {
    Swal.fire("Estas de acuerdo con nuestros términos y condiciones");
  }
})();
