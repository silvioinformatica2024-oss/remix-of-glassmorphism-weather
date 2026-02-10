
# Ajuste do Arco Solar para Corresponder a Imagem de Referencia

## Analise da Referencia vs. Atual

Na imagem de referencia, o arco pontilhado:
- Esta **centralizado horizontalmente** no widget
- Tem uma **curva acentuada para cima** (semicirculo bem definido)
- Ocupa o espaco central entre o sol (canto superior esquerdo) e o avatar (canto superior direito)
- O marcador de posicao (dot) fica na parte inferior direita do arco
- Temperatura, hora e data ficam alinhados na parte inferior, cada um em seu espaco

## Mudancas Planejadas

### 1. SunPath.tsx - Redesenhar o arco
- Alterar a geometria do arco para ser um semicirculo mais pronunciado, curvando de baixo-direita para cima e descendo em baixo-esquerda (como na referencia)
- Ajustar o `viewBox` para centralizar o arco
- O arco na referencia vai de aproximadamente 0 graus (direita) ate 180 graus (esquerda), passando pelo topo - um semicirculo classico invertido
- Angulo inicial: ~10 graus (baixo-direita), angulo final: ~170 graus (baixo-esquerda), curvando por cima

### 2. WeatherWidget.tsx - Ajustar layout da area do sol
- Remover o offset `ml-12` do SunPath e centralizar o arco no widget
- Manter o sol (esfera) posicionado no canto superior esquerdo, fora/acima do arco
- Reposicionar temperatura, hora e data na linha inferior com espacamento adequado
- Garantir que cada elemento tenha seu espaco sem sobreposicao
- Possivel ajuste da largura do widget de 400px para ~420px se necessario para pixel-perfect

### 3. Detalhes tecnicos

**SunPath.tsx:**
- Centro do arco: `cx=150, cy=140`, raio: `r=110`
- Angulo de inicio: 170 graus (baixo-esquerda), angulo final: 10 graus (baixo-direita)
- Sweep direction ajustado para curvar por cima (counterclockwise)
- ViewBox ajustado para `0 10 300 150` para enquadrar o semicirculo

**WeatherWidget.tsx:**
- Area do sun path: centralizada, sem margens laterais forcadas
- Sol (esfera dourada) posicionado absolute no topo-esquerdo
- Linha inferior com `flex justify-between` para temperatura | hora | data
- Widget width pode ir para `w-[420px]` se necessario
