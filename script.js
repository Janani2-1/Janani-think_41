const textEditor = document.getElementById('textEditor');
const lineNumbers = document.getElementById('lineNumbers');
const fileInput = document.getElementById('fileInput');

// Update line numbers dynamically
function updateLineNumbers() {
  const lines = textEditor.value.split('\n').length;
  lineNumbers.innerHTML = Array.from({ length: lines }, (_, i) => i + 1).join('\n');
}

// Sync scroll between editor and line numbers
function syncScroll() {
  lineNumbers.scrollTop = textEditor.scrollTop;
}

// Jump to a specific line
function jumpToLine() {
  const jumpInput = document.getElementById('jumpInput');
  const line = parseInt(jumpInput.value);
  const lines = textEditor.value.split('\n');

  if (isNaN(line) || line < 1 || line > lines.length) {
    alert("Invalid line number");
    return;
  }

  let pos = 0;
  for (let i = 0; i < line - 1; i++) {
    pos += lines[i].length + 1;
  }

  textEditor.focus();
  textEditor.setSelectionRange(pos, pos);
  const lineHeight = 20;
  textEditor.scrollTop = (line - 1) * lineHeight;
}

// Load file content into textarea
fileInput.addEventListener('change', function () {
  const file = fileInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    textEditor.value = e.target.result;
    updateLineNumbers();
  };
  reader.readAsText(file);
});

// Initialize line numbers
updateLineNumbers();
