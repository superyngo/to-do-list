const lists = document.querySelector("#to_do_list");
const to_do_list = document.querySelector("#to_do_list");
const input = document.querySelector("#input");
const add_btn = document.querySelector("#add_btn");
const export_btn = document.querySelector("#export_btn");
const importance = document.querySelector("#importance");
const save_btn = document.querySelector("#save_btn");

importance.onchange = changeinginput;
add_btn.onclick = adding;
export_btn.onclick = exporting;
save_btn.onclick = saving;

if (localStorage.getItem("listsArray")) {
  const lists = JSON.parse(localStorage.getItem("listsArray"));
  for (i = 0; i < lists.length; i++) {
    input.value = lists[i].content;
    importance.value = lists[i].importance;

    adding(lists[i].completed);
  }
  input.value = null;
  importance.value = "normal";
}

function adding(ifDone) {
  if (input.value == "") {
    return;
  }
  let new_li = document.createElement("li");
  let new_span = document.createElement("span");
  let del_btn = document.createElement("button");
  let selected_importance = importance[importance.selectedIndex].value;
  let mark_done_span = document.createElement("span");
  let switch_done_btn = document.createElement("button");
  new_li.className = selected_importance;
  new_span.textContent = input.value;
  del_btn.textContent = "-";
  del_btn.className = "del_button";

  mark_done_span.textContent = "(已完成)";
  if (ifDone === true) {
    mark_done_span.style.display = "inline";
  } else {
    mark_done_span.style.display = "none";
  }

  switch_done_btn.textContent = "標示為已完成";
  switch_done_btn.onclick = markdone;

  del_btn.onclick = deleting;

  lists.append(new_li);
  new_li.append(new_span);
  new_li.append(mark_done_span);
  new_li.append(switch_done_btn);
  new_li.append(del_btn);
}

function deleting() {
  event.target.parentElement.remove();
}

function changeinginput() {
  let selected_importance = importance[importance.selectedIndex].value;
  input.className = selected_importance;
}

function markdone() {
  let target = event.target;
  if (target.textContent == "標示為已完成") {
    target.textContent = "標示為未完成";
    target.parentElement.children[1].style.display = "inline";
    return;
  }
  if (target.textContent == "標示為未完成") {
    target.textContent = "標示為已完成";
    target.parentElement.children[1].style.display = "none";
  }
}

function exporting() {
  let export_text = "";
  let num = 1;
  let asterisk;
  for (let x of to_do_list.children) {
    let done = "";
    if (x.className == "normal") {
      asterisk = "";
    }
    if (x.className == "important") {
      asterisk = "*";
    }
    if (x.className == "urgent") {
      asterisk = "**";
    }
    if (x.children[1].style.display == "inline") {
      done = x.children[1].textContent;
    }
    export_text =
      export_text +
      num.toString() +
      "." +
      asterisk +
      x.children[0].textContent +
      asterisk +
      done +
      "\n";
    num = num + 1;
  }
  alert("待辦事項：\n" + export_text);
}

function saving() {
  const listsArray = [];
  for (let list of to_do_list.children) {
    let i = 0;
    const listItem = {
      content: list.children[0].textContent,
      importance: list.className,
      completed: list.children[1].style.display == "inline",
    };
    listsArray.push(listItem);
  }
  localStorage.setItem("listsArray", JSON.stringify(listsArray));
  alert("saved");
  console.log(listsArray);
}
