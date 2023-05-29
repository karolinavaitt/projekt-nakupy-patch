import "./style.css";

export const ListItem = (props) => {
  const { day, item } = props;
  const { id, done, product, amount, unit, expanded } = item;

  let tickClass = "";
  if (done) {
    tickClass = " btn-tick--on";
  }

  const element = document.createElement("div");
  element.classList.add("list-item");
  if (expanded) {
    element.classList.add("list-item--expanded");
  }
  element.innerHTML = `
  <div class="list-item__toolbar">Tlačítka</div>
    <button class="icon-btn btn-tick${tickClass}"></button>
    <div class="list-item__body">
      <div class="list-item__product">${product}</div>
      <div class="list-item__amount">${amount} ${unit}</div>
    </div>
    <div class="list-item__detail">
      Detail položky
    </div>
    <div class="list-item__menu">
      <button class="icon-btn btn-menu"></button>
    </div>
  `;

  const handleTick = () => {
    fetch(`https://nakupy.kodim.app/api/me/week/${day}/items/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        done: !done,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        element.replaceWith(ListItem({ day, item: data.result }));
      });
  };

  const expandMenu = () => {
    element.replaceWith(
      ListItem({
        day: day,
        item: item,
        expanded: !expanded,
      })
    );
  };

  element.querySelector(".btn-menu").addEventListener("click", expandMenu);

  element.querySelector(".btn-tick").addEventListener("click", handleTick);
  return element;
};
