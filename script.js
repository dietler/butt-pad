const productCards = Array.from(document.querySelectorAll(".product-card"));

function clampQuantity(value) {
  const number = Number.parseInt(value, 10);
  if (Number.isNaN(number)) {
    return 1;
  }
  return Math.min(9, Math.max(1, number));
}

function selectedButton(card, selector) {
  return card.querySelector(`${selector}.selected`);
}

function updateCard(card) {
  const product = card.dataset.product;
  const fit = selectedButton(card, ".fit-option")?.dataset.size ?? "M";
  const fabricButton = selectedButton(card, ".fabric-option");
  const fabric = fabricButton?.dataset.fabric ?? "Pillowcase Premium";
  const price = Number(fabricButton?.dataset.price ?? 35);
  const quantityInput = card.querySelector(".quantity-input");
  const quantity = clampQuantity(quantityInput.value);
  const total = quantity * price;

  quantityInput.value = String(quantity);
  card.querySelector(".add-product").textContent = `Add ${product} ${fit} / ${fabric} - $${total}`;
}

function setSelected(buttons, selectedButtonElement) {
  buttons.forEach((button) => {
    const isSelected = button === selectedButtonElement;
    button.classList.toggle("selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });
}

productCards.forEach((card) => {
  const fitButtons = Array.from(card.querySelectorAll(".fit-option"));
  const fabricButtons = Array.from(card.querySelectorAll(".fabric-option"));
  const quantityInput = card.querySelector(".quantity-input");
  const stepperButtons = Array.from(card.querySelectorAll(".stepper"));
  const addButton = card.querySelector(".add-product");
  const cartNote = card.querySelector(".cart-note");

  fitButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setSelected(fitButtons, button);
      updateCard(card);
    });
  });

  fabricButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setSelected(fabricButtons, button);
      updateCard(card);
    });
  });

  stepperButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextValue = clampQuantity(quantityInput.value) + Number(button.dataset.step);
      quantityInput.value = String(clampQuantity(nextValue));
      updateCard(card);
    });
  });

  quantityInput.addEventListener("input", () => updateCard(card));
  quantityInput.addEventListener("blur", () => updateCard(card));

  addButton.addEventListener("click", () => {
    const product = card.dataset.product;
    const fit = selectedButton(card, ".fit-option")?.dataset.size ?? "M";
    const fabricButton = selectedButton(card, ".fabric-option");
    const fabric = fabricButton?.dataset.fabric ?? "Pillowcase Premium";
    const price = Number(fabricButton?.dataset.price ?? 35);
    const quantity = clampQuantity(quantityInput.value);
    const total = quantity * price;
    const pairText = quantity === 1 ? "pair" : "pairs";

    cartNote.textContent = `${quantity} ${pairText} of ${product} ${fit} / ${fabric} added. Total: $${total}.`;
  });

  updateCard(card);
});
