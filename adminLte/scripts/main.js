
// Dados fictícios para o dashboard
document.addEventListener('DOMContentLoaded', function(){
  const clientes = 128, produtos = 58, vendas = 342;
  document.getElementById('totalClientes').innerText = clientes;
  document.getElementById('totalProdutos').innerText = produtos;
  document.getElementById('totalVendas').innerText = vendas;

  const ctx = document.getElementById('vendasChart').getContext('2d');
  new Chart(ctx, { type: 'bar', data: { labels: ['Jan','Fev','Mar','Abr','Mai','Jun'], datasets: [{ label: 'Vendas', data: [30,45,60,50,80,77] }] }, options: { responsive:true } });
});
