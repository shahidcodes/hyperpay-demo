const paymentPage = () => `

<html>

<head>
<meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
</head>

<body>
  <div class="container mx-auto items-center">
  <form method="POST" action="/pay/create">
    <div class="flex flex-col bg-blue-300 items-center mt-52 py-40 rounded">
      <div class="selection">
        <label for="cardType">Select Card Type</label><br />
        <select id="cardType" name="cardType" class="border px-2 py-4 rounded">
          <option value="mada">MADA</option>
          <option value="non-mada">NON-MADA (VISA,AMEX, MASTER)</option>
        </select>
      </div>
      <div>
        <label for="amount">Amount</label> <br />
        <input type="text" name="amount" class="px-4 py-2 rounded w-full outline-none focus:ring" autocomplete="off"/>
      </div>
      <div class="pay-button">
        <button type="submit" class="px-6 py-2 bg-blue-500 text-white rounded my-2">Pay</button>
      </div>
    </div>
    </form>
  </div>
</body>

</html>

`;

module.exports = paymentPage;
