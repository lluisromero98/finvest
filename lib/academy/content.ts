import type { Module } from "./types";

export const academyModules: Module[] = [
  // MODULE 1: FOUNDATIONS
  {
    id: "foundations",
    index: 0,
    title: { es: "Fundamentos", en: "Foundations", ca: "Fonaments" },
    description: {
      es: "Estructura del mercado, conceptos básicos de SMC y cómo leer el precio.",
      en: "Market structure, basic SMC concepts and how to read price.",
      ca: "Estructura del mercat, conceptes bàsics de SMC i com llegir el preu.",
    },
    color: "emerald",
    icon: "BookOpen",
    lessons: [
      {
        id: "market-structure",
        moduleId: "foundations",
        title: {
          es: "Estructura del Mercado",
          en: "Market Structure",
          ca: "Estructura del Mercat",
        },
        description: {
          es: "HH, HL, LH, LL - Los pilares del análisis técnico SMC.",
          en: "HH, HL, LH, LL - The pillars of SMC technical analysis.",
          ca: "HH, HL, LH, LL - Els pilars de l'anàlisi tècnic SMC.",
        },
        sections: [
          {
            title: {
              es: "¿Qué es la Estructura del Mercado?",
              en: "What is Market Structure?",
              ca: "Què és l'Estructura del Mercat?",
            },
            content: {
              es: "La estructura del mercado es el patrón fundamental de cómo se mueve el precio. En una tendencia alcista, el precio forma Higher Highs (HH) y Higher Lows (HL). En una tendencia bajista, forma Lower Highs (LH) y Lower Lows (LL). Identificar correctamente la estructura es el primer paso para operar con Smart Money Concepts.",
              en: "Market structure is the fundamental pattern of how price moves. In an uptrend, price forms Higher Highs (HH) and Higher Lows (HL). In a downtrend, it forms Lower Highs (LH) and Lower Lows (LL). Correctly identifying structure is the first step to trading with Smart Money Concepts.",
              ca: "L'estructura del mercat és el patró fonamental de com es mou el preu. En una tendència alcista, el preu forma Higher Highs (HH) i Higher Lows (HL). En una tendència baixista, forma Lower Highs (LH) i Lower Lows (LL). Identificar correctament l'estructura és el primer pas per operar amb Smart Money Concepts.",
            },
          },
          {
            title: {
              es: "Tendencia Alcista vs Bajista",
              en: "Bullish vs Bearish Trend",
              ca: "Tendència Alcista vs Baixista",
            },
            content: {
              es: "Tendencia Alcista: El precio crea máximos más altos y mínimos más altos de forma consistente. Cada retroceso se detiene en un nivel superior al anterior. Tendencia Bajista: El precio crea máximos más bajos y mínimos más bajos. Cada rebote se detiene en un nivel inferior al anterior. El cambio de estructura (de alcista a bajista o viceversa) es lo que nos da las oportunidades de trading.",
              en: "Bullish Trend: Price consistently creates higher highs and higher lows. Each pullback stops at a level higher than the previous one. Bearish Trend: Price creates lower highs and lower lows. Each bounce stops at a level lower than the previous one. The change in structure (from bullish to bearish or vice versa) is what gives us trading opportunities.",
              ca: "Tendència Alcista: El preu crea màxims més alts i mínims més alts de forma consistent. Cada retrocés s'atura en un nivell superior a l'anterior. Tendència Baixista: El preu crea màxims més baixos i mínims més baixos. Cada rebot s'atura en un nivell inferior a l'anterior. El canvi d'estructura (d'alcista a baixista o viceversa) és el que ens dóna les oportunitats de trading.",
            },
          },
        ],
        keyTakeaways: {
          es: ["HH + HL = Tendencia alcista", "LH + LL = Tendencia bajista", "Siempre opera a favor de la estructura dominante", "La estructura en timeframes mayores tiene más peso"],
          en: ["HH + HL = Bullish trend", "LH + LL = Bearish trend", "Always trade in the direction of dominant structure", "Structure on higher timeframes carries more weight"],
          ca: ["HH + HL = Tendència alcista", "LH + LL = Tendència baixista", "Sempre opera a favor de l'estructura dominant", "L'estructura en timeframes majors té més pes"],
        },
        whenToBuy: {
          es: ["El precio forma HH y HL en tu timeframe de análisis", "Espera un retroceso al último HL", "Confirma con un BOS alcista en timeframe inferior"],
          en: ["Price forms HH and HL on your analysis timeframe", "Wait for a pullback to the last HL", "Confirm with a bullish BOS on lower timeframe"],
          ca: ["El preu forma HH i HL en el teu timeframe d'anàlisi", "Espera un retrocés al últim HL", "Confirma amb un BOS alcista en timeframe inferior"],
        },
        whenToSell: {
          es: ["El precio forma LH y LL en tu timeframe de análisis", "Espera un retroceso al último LH", "Confirma con un BOS bajista en timeframe inferior"],
          en: ["Price forms LH and LL on your analysis timeframe", "Wait for a pullback to the last LH", "Confirm with a bearish BOS on lower timeframe"],
          ca: ["El preu forma LH i LL en el teu timeframe d'anàlisi", "Espera un retrocés al últim LH", "Confirma amb un BOS baixista en timeframe inferior"],
        },
        diagram: "market-structure",
      },
      {
        id: "bos-choch",
        moduleId: "foundations",
        title: { es: "BOS y ChoCH", en: "BOS and ChoCH", ca: "BOS i ChoCH" },
        description: {
          es: "Break of Structure y Change of Character - señales de continuación y cambio.",
          en: "Break of Structure and Change of Character - continuation and reversal signals.",
          ca: "Break of Structure i Change of Character - senyals de continuació i canvi.",
        },
        sections: [
          {
            title: { es: "Break of Structure (BOS)", en: "Break of Structure (BOS)", ca: "Break of Structure (BOS)" },
            content: {
              es: "Un BOS ocurre cuando el precio rompe el último máximo significativo (en tendencia alcista) o el último mínimo significativo (en tendencia bajista). Es una señal de CONTINUACIÓN de la tendencia actual. Un BOS alcista confirma que los compradores siguen en control. Un BOS bajista confirma que los vendedores mantienen el dominio.",
              en: "A BOS occurs when price breaks the last significant high (in uptrend) or the last significant low (in downtrend). It's a signal of CONTINUATION of the current trend. A bullish BOS confirms buyers are still in control. A bearish BOS confirms sellers maintain dominance.",
              ca: "Un BOS ocorre quan el preu trenca l'últim màxim significatiu (en tendència alcista) o l'últim mínim significatiu (en tendència baixista). És un senyal de CONTINUACIÓ de la tendència actual. Un BOS alcista confirma que els compradors segueixen en control. Un BOS baixista confirma que els venedors mantenen el domini.",
            },
          },
          {
            title: { es: "Change of Character (ChoCH)", en: "Change of Character (ChoCH)", ca: "Change of Character (ChoCH)" },
            content: {
              es: "Un ChoCH es el PRIMER rompimiento que va CONTRA la tendencia establecida. En una tendencia alcista, un ChoCH ocurre cuando el precio rompe el último HL, indicando un posible cambio a bajista. En una tendencia bajista, un ChoCH ocurre cuando rompe el último LH, indicando posible cambio a alcista. Es la primera señal de que el Smart Money está cambiando de dirección.",
              en: "A ChoCH is the FIRST break that goes AGAINST the established trend. In an uptrend, a ChoCH occurs when price breaks the last HL, indicating a possible shift to bearish. In a downtrend, a ChoCH occurs when it breaks the last LH, indicating a possible shift to bullish. It's the first signal that Smart Money is changing direction.",
              ca: "Un ChoCH és el PRIMER trencament que va CONTRA la tendència establerta. En una tendència alcista, un ChoCH ocorre quan el preu trenca l'últim HL, indicant un possible canvi a baixista. En una tendència baixista, un ChoCH ocorre quan trenca l'últim LH, indicant possible canvi a alcista. És el primer senyal que el Smart Money està canviant de direcció.",
            },
          },
        ],
        keyTakeaways: {
          es: ["BOS = Continuación de tendencia", "ChoCH = Primer aviso de cambio de tendencia", "Un ChoCH necesita confirmación (no operar solo por ChoCH)", "Siempre identifica BOS/ChoCH en tu timeframe de análisis primero"],
          en: ["BOS = Trend continuation", "ChoCH = First warning of trend change", "A ChoCH needs confirmation (don't trade on ChoCH alone)", "Always identify BOS/ChoCH on your analysis timeframe first"],
          ca: ["BOS = Continuació de tendència", "ChoCH = Primer avís de canvi de tendència", "Un ChoCH necessita confirmació (no operar només per ChoCH)", "Sempre identifica BOS/ChoCH en el teu timeframe d'anàlisi primer"],
        },
        whenToBuy: {
          es: ["ChoCH alcista después de tendencia bajista", "Espera retroceso a Order Block o FVG", "Confirma con BOS alcista en timeframe inferior"],
          en: ["Bullish ChoCH after bearish trend", "Wait for pullback to Order Block or FVG", "Confirm with bullish BOS on lower timeframe"],
          ca: ["ChoCH alcista després de tendència baixista", "Espera retrocés a Order Block o FVG", "Confirma amb BOS alcista en timeframe inferior"],
        },
        whenToSell: {
          es: ["ChoCH bajista después de tendencia alcista", "Espera retroceso a Order Block o FVG", "Confirma con BOS bajista en timeframe inferior"],
          en: ["Bearish ChoCH after bullish trend", "Wait for pullback to Order Block or FVG", "Confirm with bearish BOS on lower timeframe"],
          ca: ["ChoCH baixista després de tendència alcista", "Espera retrocés a Order Block o FVG", "Confirma amb BOS baixista en timeframe inferior"],
        },
        diagram: "bos-choch",
      },
      {
        id: "premium-discount",
        moduleId: "foundations",
        title: { es: "Premium y Discount", en: "Premium and Discount", ca: "Premium i Discount" },
        description: {
          es: "Zonas de valor justo - dónde comprar barato y vender caro.",
          en: "Fair value zones - where to buy cheap and sell expensive.",
          ca: "Zones de valor just - on comprar barat i vendre car.",
        },
        sections: [
          {
            title: { es: "Concepto Premium/Discount", en: "Premium/Discount Concept", ca: "Concepte Premium/Discount" },
            content: {
              es: "Divide cualquier rango del precio (swing high a swing low) en dos mitades usando el nivel del 50% (Equilibrium). La zona por ENCIMA del 50% es Premium (caro) - aquí buscamos vender. La zona por DEBAJO del 50% es Discount (barato) - aquí buscamos comprar. Los traders institucionales (Smart Money) compran en Discount y venden en Premium. Operar al revés es operar como retail.",
              en: "Divide any price range (swing high to swing low) into two halves using the 50% level (Equilibrium). The zone ABOVE 50% is Premium (expensive) - here we look to sell. The zone BELOW 50% is Discount (cheap) - here we look to buy. Institutional traders (Smart Money) buy at Discount and sell at Premium. Trading the opposite is trading like retail.",
              ca: "Divideix qualsevol rang del preu (swing high a swing low) en dues meitats utilitzant el nivell del 50% (Equilibrium). La zona per SOBRE del 50% és Premium (car) - aquí busquem vendre. La zona per SOTA del 50% és Discount (barat) - aquí busquem comprar. Els traders institucionals (Smart Money) compren en Discount i venen en Premium. Operar al revés és operar com a retail.",
            },
          },
        ],
        keyTakeaways: {
          es: ["Compra en Discount (bajo el 50%)", "Vende en Premium (sobre el 50%)", "El nivel del 50% (Equilibrium) actúa como soporte/resistencia", "Usa Fibonacci 0.5 como referencia rápida"],
          en: ["Buy at Discount (below 50%)", "Sell at Premium (above 50%)", "The 50% level (Equilibrium) acts as support/resistance", "Use Fibonacci 0.5 as a quick reference"],
          ca: ["Compra en Discount (sota el 50%)", "Ven en Premium (sobre el 50%)", "El nivell del 50% (Equilibrium) actua com a suport/resistència", "Usa Fibonacci 0.5 com a referència ràpida"],
        },
        whenToBuy: {
          es: ["El precio está en la zona Discount (bajo 50% del rango)", "Hay un Order Block o FVG en Discount", "La estructura general es alcista"],
          en: ["Price is in the Discount zone (below 50% of range)", "There's an Order Block or FVG at Discount", "Overall structure is bullish"],
          ca: ["El preu està en la zona Discount (sota 50% del rang)", "Hi ha un Order Block o FVG en Discount", "L'estructura general és alcista"],
        },
        whenToSell: {
          es: ["El precio está en la zona Premium (sobre 50% del rango)", "Hay un Order Block o FVG en Premium", "La estructura general es bajista"],
          en: ["Price is in the Premium zone (above 50% of range)", "There's an Order Block or FVG at Premium", "Overall structure is bearish"],
          ca: ["El preu està en la zona Premium (sobre 50% del rang)", "Hi ha un Order Block o FVG en Premium", "L'estructura general és baixista"],
        },
      },
    ],
  },

  // MODULE 2: KEY CONCEPTS
  {
    id: "key-concepts",
    index: 1,
    title: { es: "Conceptos Clave", en: "Key Concepts", ca: "Conceptes Clau" },
    description: {
      es: "Order Blocks, FVGs, Breakers y OTE - las herramientas del Smart Money.",
      en: "Order Blocks, FVGs, Breakers and OTE - Smart Money tools.",
      ca: "Order Blocks, FVGs, Breakers i OTE - les eines del Smart Money.",
    },
    color: "blue",
    icon: "Layers",
    lessons: [
      {
        id: "order-blocks",
        moduleId: "key-concepts",
        title: { es: "Order Blocks", en: "Order Blocks", ca: "Order Blocks" },
        description: {
          es: "Las zonas donde las instituciones colocan sus órdenes masivas.",
          en: "Zones where institutions place their massive orders.",
          ca: "Les zones on les institucions col·loquen les seves ordres massives.",
        },
        sections: [
          {
            title: { es: "¿Qué es un Order Block?", en: "What is an Order Block?", ca: "Què és un Order Block?" },
            content: {
              es: "Un Order Block (OB) es la última vela bajista antes de un movimiento alcista fuerte, o la última vela alcista antes de un movimiento bajista fuerte. Representa el punto donde el Smart Money colocó sus órdenes. Cuando el precio retrocede a esta zona, suele rebotar porque el Smart Money defiende sus posiciones. Un OB válido debe: 1) Estar antes de un BOS, 2) Estar en zona de Discount (para compra) o Premium (para venta), 3) No haber sido mitigado anteriormente.",
              en: "An Order Block (OB) is the last bearish candle before a strong bullish move, or the last bullish candle before a strong bearish move. It represents the point where Smart Money placed their orders. When price pulls back to this zone, it typically bounces because Smart Money defends their positions. A valid OB must: 1) Be before a BOS, 2) Be in Discount zone (for buys) or Premium zone (for sells), 3) Not have been mitigated previously.",
              ca: "Un Order Block (OB) és l'última espelma baixista abans d'un moviment alcista fort, o l'última espelma alcista abans d'un moviment baixista fort. Representa el punt on el Smart Money va col·locar les seves ordres. Quan el preu retrocedeix a aquesta zona, sol rebotar perquè el Smart Money defensa les seves posicions. Un OB vàlid ha de: 1) Estar abans d'un BOS, 2) Estar en zona de Discount (per compra) o Premium (per venda), 3) No haver estat mitigat anteriorment.",
            },
          },
        ],
        keyTakeaways: {
          es: ["OB alcista = última vela bajista antes de subida", "OB bajista = última vela alcista antes de bajada", "Busca OBs en Discount para comprar, Premium para vender", "Un OB mitigado ya no es válido"],
          en: ["Bullish OB = last bearish candle before rally", "Bearish OB = last bullish candle before drop", "Look for OBs at Discount to buy, Premium to sell", "A mitigated OB is no longer valid"],
          ca: ["OB alcista = última espelma baixista abans de pujada", "OB baixista = última espelma alcista abans de baixada", "Busca OBs en Discount per comprar, Premium per vendre", "Un OB mitigat ja no és vàlid"],
        },
        whenToBuy: {
          es: ["Identifica un OB alcista en zona Discount", "Espera que el precio retroceda al OB", "Entry en la zona del OB con SL debajo"],
          en: ["Identify a bullish OB at Discount zone", "Wait for price to pull back to the OB", "Enter at the OB zone with SL below"],
          ca: ["Identifica un OB alcista en zona Discount", "Espera que el preu retrocedeixi a l'OB", "Entra a la zona de l'OB amb SL a sota"],
        },
        whenToSell: {
          es: ["Identifica un OB bajista en zona Premium", "Espera que el precio retroceda al OB", "Entry en la zona del OB con SL encima"],
          en: ["Identify a bearish OB at Premium zone", "Wait for price to pull back to the OB", "Enter at the OB zone with SL above"],
          ca: ["Identifica un OB baixista en zona Premium", "Espera que el preu retrocedeixi a l'OB", "Entra a la zona de l'OB amb SL a dalt"],
        },
        diagram: "order-block",
      },
      {
        id: "fvg",
        moduleId: "key-concepts",
        title: { es: "Fair Value Gaps (FVG)", en: "Fair Value Gaps (FVG)", ca: "Fair Value Gaps (FVG)" },
        description: {
          es: "Desequilibrios de precio que el mercado busca rellenar.",
          en: "Price imbalances that the market seeks to fill.",
          ca: "Desequilibris de preu que el mercat busca omplir.",
        },
        sections: [
          {
            title: { es: "¿Qué es un FVG?", en: "What is an FVG?", ca: "Què és un FVG?" },
            content: {
              es: "Un Fair Value Gap (FVG) es un desequilibrio de precio visible como un gap entre 3 velas consecutivas, donde la mecha de la vela 1 y la mecha de la vela 3 no se solapan. Esto indica que el precio se movió tan rápido que dejó un 'vacío'. El mercado tiende a volver a rellenar estos gaps. Un FVG alcista se forma en un movimiento alcista fuerte (gap entre la mecha alta de vela 1 y la mecha baja de vela 3). Un FVG bajista se forma en un movimiento bajista fuerte.",
              en: "A Fair Value Gap (FVG) is a price imbalance visible as a gap between 3 consecutive candles, where the wick of candle 1 and the wick of candle 3 don't overlap. This indicates price moved so fast it left a 'void'. The market tends to come back to fill these gaps. A bullish FVG forms during a strong upward move (gap between high wick of candle 1 and low wick of candle 3). A bearish FVG forms during a strong downward move.",
              ca: "Un Fair Value Gap (FVG) és un desequilibri de preu visible com un gap entre 3 espelmes consecutives, on la metxa de l'espelma 1 i la metxa de l'espelma 3 no se superposen. Això indica que el preu es va moure tan ràpid que va deixar un 'buit'. El mercat tendeix a tornar per omplir aquests gaps. Un FVG alcista es forma en un moviment alcista fort (gap entre la metxa alta de l'espelma 1 i la metxa baixa de l'espelma 3). Un FVG baixista es forma en un moviment baixista fort.",
            },
          },
        ],
        keyTakeaways: {
          es: ["FVG = Gap entre 3 velas (mechas no se tocan)", "El precio tiende a volver a rellenar FVGs", "FVGs en Discount = zona de compra", "FVGs en Premium = zona de venta"],
          en: ["FVG = Gap between 3 candles (wicks don't touch)", "Price tends to return to fill FVGs", "FVGs at Discount = buy zone", "FVGs at Premium = sell zone"],
          ca: ["FVG = Gap entre 3 espelmes (metxes no es toquen)", "El preu tendeix a tornar per omplir FVGs", "FVGs en Discount = zona de compra", "FVGs en Premium = zona de venda"],
        },
        whenToBuy: {
          es: ["FVG alcista en zona Discount", "El precio retrocede al FVG", "Estructura alcista confirmada"],
          en: ["Bullish FVG at Discount zone", "Price retraces to the FVG", "Bullish structure confirmed"],
          ca: ["FVG alcista en zona Discount", "El preu retrocedeix al FVG", "Estructura alcista confirmada"],
        },
        whenToSell: {
          es: ["FVG bajista en zona Premium", "El precio retrocede al FVG", "Estructura bajista confirmada"],
          en: ["Bearish FVG at Premium zone", "Price retraces to the FVG", "Bearish structure confirmed"],
          ca: ["FVG baixista en zona Premium", "El preu retrocedeix al FVG", "Estructura baixista confirmada"],
        },
        diagram: "fvg",
      },
      {
        id: "ote",
        moduleId: "key-concepts",
        title: { es: "OTE - Optimal Trade Entry", en: "OTE - Optimal Trade Entry", ca: "OTE - Optimal Trade Entry" },
        description: {
          es: "Usa Fibonacci para encontrar el punto de entrada óptimo.",
          en: "Use Fibonacci to find the optimal entry point.",
          ca: "Usa Fibonacci per trobar el punt d'entrada òptim.",
        },
        sections: [
          {
            title: { es: "La Zona OTE", en: "The OTE Zone", ca: "La Zona OTE" },
            content: {
              es: "OTE (Optimal Trade Entry) es la zona entre el 61.8% y 78.6% de retroceso Fibonacci de un movimiento impulsivo. Esta es la zona donde el Smart Money típicamente coloca sus entradas. Para un OTE alcista: dibuja Fibonacci del swing low al swing high. La zona 0.618-0.786 es tu OTE para buscar compras. Para un OTE bajista: dibuja Fibonacci del swing high al swing low. La zona 0.618-0.786 es tu OTE para buscar ventas. La confluencia de un OTE con un Order Block o FVG es una setup de alta probabilidad.",
              en: "OTE (Optimal Trade Entry) is the zone between the 61.8% and 78.6% Fibonacci retracement of an impulsive move. This is where Smart Money typically places their entries. For a bullish OTE: draw Fibonacci from swing low to swing high. The 0.618-0.786 zone is your OTE for buys. For a bearish OTE: draw Fibonacci from swing high to swing low. The 0.618-0.786 zone is your OTE for sells. Confluence of an OTE with an Order Block or FVG is a high probability setup.",
              ca: "OTE (Optimal Trade Entry) és la zona entre el 61.8% i 78.6% de retrocés Fibonacci d'un moviment impulsiu. Aquesta és la zona on el Smart Money típicament col·loca les seves entrades. Per a un OTE alcista: dibuixa Fibonacci del swing low al swing high. La zona 0.618-0.786 és el teu OTE per buscar compres. Per a un OTE baixista: dibuixa Fibonacci del swing high al swing low. La zona 0.618-0.786 és el teu OTE per buscar vendes. La confluència d'un OTE amb un Order Block o FVG és un setup d'alta probabilitat.",
            },
          },
        ],
        keyTakeaways: {
          es: ["OTE = zona Fibonacci 0.618 - 0.786", "Busca confluencia con OB o FVG", "Es el punto de entrada preferido del Smart Money", "Funciona mejor después de un BOS claro"],
          en: ["OTE = Fibonacci zone 0.618 - 0.786", "Look for confluence with OB or FVG", "It's Smart Money's preferred entry point", "Works best after a clear BOS"],
          ca: ["OTE = zona Fibonacci 0.618 - 0.786", "Busca confluència amb OB o FVG", "És el punt d'entrada preferit del Smart Money", "Funciona millor després d'un BOS clar"],
        },
        whenToBuy: {
          es: ["Retroceso a la zona OTE (0.618-0.786)", "Confluencia con OB alcista o FVG", "BOS alcista confirmado previamente"],
          en: ["Retracement to OTE zone (0.618-0.786)", "Confluence with bullish OB or FVG", "Previous bullish BOS confirmed"],
          ca: ["Retrocés a la zona OTE (0.618-0.786)", "Confluència amb OB alcista o FVG", "BOS alcista confirmat prèviament"],
        },
        whenToSell: {
          es: ["Retroceso a la zona OTE (0.618-0.786)", "Confluencia con OB bajista o FVG", "BOS bajista confirmado previamente"],
          en: ["Retracement to OTE zone (0.618-0.786)", "Confluence with bearish OB or FVG", "Previous bearish BOS confirmed"],
          ca: ["Retrocés a la zona OTE (0.618-0.786)", "Confluència amb OB baixista o FVG", "BOS baixista confirmat prèviament"],
        },
      },
    ],
  },

  // MODULE 3: LIQUIDITY
  {
    id: "liquidity",
    index: 2,
    title: { es: "Liquidez", en: "Liquidity", ca: "Liquiditat" },
    description: {
      es: "BSL, SSL, Sweeps e Inducement - cómo el Smart Money caza stops.",
      en: "BSL, SSL, Sweeps and Inducement - how Smart Money hunts stops.",
      ca: "BSL, SSL, Sweeps i Inducement - com el Smart Money caça stops.",
    },
    color: "purple",
    icon: "Droplets",
    lessons: [
      {
        id: "bsl-ssl",
        moduleId: "liquidity",
        title: { es: "BSL y SSL", en: "BSL and SSL", ca: "BSL i SSL" },
        description: {
          es: "Buyside y Sellside Liquidity - los pools de stops del mercado.",
          en: "Buyside and Sellside Liquidity - the market's stop pools.",
          ca: "Buyside i Sellside Liquidity - els pools de stops del mercat.",
        },
        sections: [
          {
            title: { es: "Liquidez en el Mercado", en: "Market Liquidity", ca: "Liquiditat al Mercat" },
            content: {
              es: "BSL (Buyside Liquidity): Acumulación de stop losses de vendedores y órdenes de compra por encima de máximos recientes (equal highs, swing highs). SSL (Sellside Liquidity): Acumulación de stop losses de compradores y órdenes de venta por debajo de mínimos recientes (equal lows, swing lows). El Smart Money NECESITA esta liquidez para ejecutar sus órdenes grandes. Antes de un movimiento fuerte, el precio suele ir a 'barrer' (sweep) la liquidez disponible.",
              en: "BSL (Buyside Liquidity): Accumulation of sellers' stop losses and buy orders above recent highs (equal highs, swing highs). SSL (Sellside Liquidity): Accumulation of buyers' stop losses and sell orders below recent lows (equal lows, swing lows). Smart Money NEEDS this liquidity to execute their large orders. Before a strong move, price usually goes to 'sweep' the available liquidity.",
              ca: "BSL (Buyside Liquidity): Acumulació de stop losses de venedors i ordres de compra per sobre de màxims recents (equal highs, swing highs). SSL (Sellside Liquidity): Acumulació de stop losses de compradors i ordres de venda per sota de mínims recents (equal lows, swing lows). El Smart Money NECESSITA aquesta liquiditat per executar les seves ordres grans. Abans d'un moviment fort, el preu sol anar a 'escombrar' (sweep) la liquiditat disponible.",
            },
          },
        ],
        keyTakeaways: {
          es: ["BSL = Liquidez por encima de máximos", "SSL = Liquidez por debajo de mínimos", "Equal highs/lows = Pools de liquidez obvios", "El precio busca liquidez antes de moverse"],
          en: ["BSL = Liquidity above highs", "SSL = Liquidity below lows", "Equal highs/lows = Obvious liquidity pools", "Price seeks liquidity before moving"],
          ca: ["BSL = Liquiditat per sobre de màxims", "SSL = Liquiditat per sota de mínims", "Equal highs/lows = Pools de liquiditat obvies", "El preu busca liquiditat abans de moure's"],
        },
        whenToBuy: {
          es: ["Después de un sweep de SSL (barrido de mínimos)", "El precio rechaza rápidamente la zona de liquidez", "Estructura alcista se forma después del sweep"],
          en: ["After an SSL sweep (sweep of lows)", "Price quickly rejects the liquidity zone", "Bullish structure forms after the sweep"],
          ca: ["Després d'un sweep de SSL (escombratge de mínims)", "El preu rebutja ràpidament la zona de liquiditat", "Estructura alcista es forma després del sweep"],
        },
        whenToSell: {
          es: ["Después de un sweep de BSL (barrido de máximos)", "El precio rechaza rápidamente la zona de liquidez", "Estructura bajista se forma después del sweep"],
          en: ["After a BSL sweep (sweep of highs)", "Price quickly rejects the liquidity zone", "Bearish structure forms after the sweep"],
          ca: ["Després d'un sweep de BSL (escombratge de màxims)", "El preu rebutja ràpidament la zona de liquiditat", "Estructura baixista es forma després del sweep"],
        },
        diagram: "liquidity",
      },
    ],
  },

  // MODULE 4: SESSIONS & TIMING
  {
    id: "sessions",
    index: 3,
    title: { es: "Sesiones y Timing", en: "Sessions & Timing", ca: "Sessions i Timing" },
    description: {
      es: "Kill Zones, horarios clave y cuándo operar con ventaja.",
      en: "Kill Zones, key times and when to trade with an edge.",
      ca: "Kill Zones, horaris clau i quan operar amb avantatge.",
    },
    color: "amber",
    icon: "Clock",
    lessons: [
      {
        id: "kill-zones",
        moduleId: "sessions",
        title: { es: "Las 4 Kill Zones", en: "The 4 Kill Zones", ca: "Les 4 Kill Zones" },
        description: {
          es: "Los horarios de máxima actividad institucional.",
          en: "The times of maximum institutional activity.",
          ca: "Els horaris de màxima activitat institucional.",
        },
        sections: [
          {
            title: { es: "Kill Zones ICT", en: "ICT Kill Zones", ca: "Kill Zones ICT" },
            content: {
              es: "Las Kill Zones son los períodos donde el Smart Money es más activo: 1) Asian Kill Zone (00:00-03:00 UTC): Baja volatilidad, el precio establece el rango del día. 2) London Kill Zone (07:00-10:00 UTC): Alta volatilidad. A menudo barre la liquidez asiática. La mejor sesión para EUR pairs. 3) NY AM Kill Zone (12:00-15:00 UTC): Overlap con Londres. Noticias importantes. Alta liquidez USD. 4) NY PM Kill Zone (18:00-21:00 UTC): Menor volatilidad. Retrocesos del AM. Operar SOLO durante Kill Zones mejora dramáticamente tus resultados.",
              en: "Kill Zones are the periods when Smart Money is most active: 1) Asian Kill Zone (00:00-03:00 UTC): Low volatility, price establishes the day's range. 2) London Kill Zone (07:00-10:00 UTC): High volatility. Often sweeps Asian liquidity. Best session for EUR pairs. 3) NY AM Kill Zone (12:00-15:00 UTC): Overlap with London. Major news. High USD liquidity. 4) NY PM Kill Zone (18:00-21:00 UTC): Lower volatility. AM retracements. Trading ONLY during Kill Zones dramatically improves your results.",
              ca: "Les Kill Zones són els períodes on el Smart Money és més actiu: 1) Asian Kill Zone (00:00-03:00 UTC): Baixa volatilitat, el preu estableix el rang del dia. 2) London Kill Zone (07:00-10:00 UTC): Alta volatilitat. Sovint escombra la liquiditat asiàtica. La millor sessió per a parells EUR. 3) NY AM Kill Zone (12:00-15:00 UTC): Overlap amb Londres. Notícies importants. Alta liquiditat USD. 4) NY PM Kill Zone (18:00-21:00 UTC): Menor volatilitat. Retrocessos de l'AM. Operar NOMÉS durant Kill Zones millora dràsticament els teus resultats.",
            },
          },
        ],
        keyTakeaways: {
          es: ["Opera SOLO durante Kill Zones", "London es la mejor sesión para Forex", "NY AM es la mejor para índices y USD", "Asian establece el rango - no operar (analizar)"],
          en: ["Trade ONLY during Kill Zones", "London is the best session for Forex", "NY AM is best for indices and USD", "Asian establishes the range - don't trade (analyze)"],
          ca: ["Opera NOMÉS durant Kill Zones", "London és la millor sessió per a Forex", "NY AM és la millor per a índexs i USD", "Asian estableix el rang - no operar (analitzar)"],
        },
        whenToBuy: {
          es: ["Durante London o NY AM Kill Zone", "Después de un sweep de SSL en la sesión asiática", "Bias alcista del timeframe diario"],
          en: ["During London or NY AM Kill Zone", "After an SSL sweep during Asian session", "Bullish daily timeframe bias"],
          ca: ["Durant London o NY AM Kill Zone", "Després d'un sweep de SSL a la sessió asiàtica", "Bias alcista del timeframe diari"],
        },
        whenToSell: {
          es: ["Durante London o NY AM Kill Zone", "Después de un sweep de BSL en la sesión asiática", "Bias bajista del timeframe diario"],
          en: ["During London or NY AM Kill Zone", "After a BSL sweep during Asian session", "Bearish daily timeframe bias"],
          ca: ["Durant London o NY AM Kill Zone", "Després d'un sweep de BSL a la sessió asiàtica", "Bias baixista del timeframe diari"],
        },
        diagram: "kill-zone",
      },
    ],
  },

  // MODULE 5: MULTI-TIMEFRAME
  {
    id: "multi-timeframe",
    index: 4,
    title: { es: "Multi-Timeframe", en: "Multi-Timeframe", ca: "Multi-Timeframe" },
    description: {
      es: "Análisis Top-Down, bias diario y jerarquía de timeframes.",
      en: "Top-Down analysis, daily bias and timeframe hierarchy.",
      ca: "Anàlisi Top-Down, bias diari i jerarquia de timeframes.",
    },
    color: "cyan",
    icon: "Layers",
    lessons: [
      {
        id: "top-down-analysis",
        moduleId: "multi-timeframe",
        title: { es: "Análisis Top-Down", en: "Top-Down Analysis", ca: "Anàlisi Top-Down" },
        description: {
          es: "Cómo analizar desde el timeframe mayor al menor.",
          en: "How to analyze from higher to lower timeframe.",
          ca: "Com analitzar des del timeframe major al menor.",
        },
        sections: [
          {
            title: { es: "Jerarquía de Timeframes", en: "Timeframe Hierarchy", ca: "Jerarquia de Timeframes" },
            content: {
              es: "El análisis Top-Down es fundamental en SMC. Proceso: 1) Monthly/Weekly: Determina la dirección general del mercado. 2) Daily: Identifica el bias del día (alcista/bajista). Busca niveles clave (PDH, PDL, PWH, PWL). 3) H4/H1: Identifica la estructura interna y zonas de interés (OBs, FVGs). 4) M15/M5: Busca tu entrada precisa durante la Kill Zone. Nunca operes en contra del timeframe mayor. Tu timeframe de análisis dicta la dirección, tu timeframe de entrada dicta el timing.",
              en: "Top-Down analysis is fundamental in SMC. Process: 1) Monthly/Weekly: Determine the overall market direction. 2) Daily: Identify the day's bias (bullish/bearish). Find key levels (PDH, PDL, PWH, PWL). 3) H4/H1: Identify internal structure and areas of interest (OBs, FVGs). 4) M15/M5: Find your precise entry during the Kill Zone. Never trade against the higher timeframe. Your analysis timeframe dictates direction, your entry timeframe dictates timing.",
              ca: "L'anàlisi Top-Down és fonamental en SMC. Procés: 1) Monthly/Weekly: Determina la direcció general del mercat. 2) Daily: Identifica el bias del dia (alcista/baixista). Busca nivells clau (PDH, PDL, PWH, PWL). 3) H4/H1: Identifica l'estructura interna i zones d'interès (OBs, FVGs). 4) M15/M5: Busca la teva entrada precisa durant la Kill Zone. Mai operis en contra del timeframe major. El teu timeframe d'anàlisi dicta la direcció, el teu timeframe d'entrada dicta el timing.",
            },
          },
        ],
        keyTakeaways: {
          es: ["Siempre analiza de mayor a menor timeframe", "Weekly/Daily = Dirección", "H4/H1 = Estructura y zonas", "M15/M5 = Entrada precisa"],
          en: ["Always analyze from higher to lower timeframe", "Weekly/Daily = Direction", "H4/H1 = Structure and zones", "M15/M5 = Precise entry"],
          ca: ["Sempre analitza de major a menor timeframe", "Weekly/Daily = Direcció", "H4/H1 = Estructura i zones", "M15/M5 = Entrada precisa"],
        },
        whenToBuy: {
          es: ["Weekly/Daily alcista", "H4 muestra retroceso a zona de interés", "M15 confirma BOS alcista dentro de la zona"],
          en: ["Weekly/Daily bullish", "H4 shows pullback to area of interest", "M15 confirms bullish BOS within the zone"],
          ca: ["Weekly/Daily alcista", "H4 mostra retrocés a zona d'interès", "M15 confirma BOS alcista dins de la zona"],
        },
        whenToSell: {
          es: ["Weekly/Daily bajista", "H4 muestra retroceso a zona de interés", "M15 confirma BOS bajista dentro de la zona"],
          en: ["Weekly/Daily bearish", "H4 shows pullback to area of interest", "M15 confirms bearish BOS within the zone"],
          ca: ["Weekly/Daily baixista", "H4 mostra retrocés a zona d'interès", "M15 confirma BOS baixista dins de la zona"],
        },
      },
    ],
  },

  // MODULE 6: ENTRY MODELS
  {
    id: "entry-models",
    index: 5,
    title: { es: "Modelos de Entrada", en: "Entry Models", ca: "Models d'Entrada" },
    description: {
      es: "Setups bullish y bearish completos con reglas claras.",
      en: "Complete bullish and bearish setups with clear rules.",
      ca: "Setups bullish i bearish complets amb regles clares.",
    },
    color: "green",
    icon: "Target",
    lessons: [
      {
        id: "bullish-setup",
        moduleId: "entry-models",
        title: { es: "Setup Bullish Completo", en: "Complete Bullish Setup", ca: "Setup Bullish Complet" },
        description: {
          es: "Paso a paso para una entrada de compra de alta probabilidad.",
          en: "Step by step for a high probability buy entry.",
          ca: "Pas a pas per a una entrada de compra d'alta probabilitat.",
        },
        sections: [
          {
            title: { es: "Checklist de Entrada Bullish", en: "Bullish Entry Checklist", ca: "Checklist d'Entrada Bullish" },
            content: {
              es: "1. BIAS: Daily/Weekly muestra estructura alcista. 2. TIMING: Estamos en una Kill Zone (London o NY AM). 3. LIQUIDEZ: Se ha producido un sweep de SSL (mínimos barridos). 4. ESTRUCTURA: ChoCH o BOS alcista en H1/M15. 5. ZONA: El precio retrocede a un OB/FVG en Discount dentro de la zona OTE. 6. CONFIRMACIÓN: Vela de rechazo o BOS alcista en M5/M1. 7. ENTRADA: Buy en el OB/FVG. SL debajo de la estructura. TP en la próxima zona de liquidez (BSL).",
              en: "1. BIAS: Daily/Weekly shows bullish structure. 2. TIMING: We're in a Kill Zone (London or NY AM). 3. LIQUIDITY: An SSL sweep has occurred (lows swept). 4. STRUCTURE: Bullish ChoCH or BOS on H1/M15. 5. ZONE: Price pulls back to an OB/FVG at Discount within OTE zone. 6. CONFIRMATION: Rejection candle or bullish BOS on M5/M1. 7. ENTRY: Buy at the OB/FVG. SL below structure. TP at the next liquidity zone (BSL).",
              ca: "1. BIAS: Daily/Weekly mostra estructura alcista. 2. TIMING: Estem en una Kill Zone (London o NY AM). 3. LIQUIDITAT: S'ha produït un sweep de SSL (mínims escombrats). 4. ESTRUCTURA: ChoCH o BOS alcista en H1/M15. 5. ZONA: El preu retrocedeix a un OB/FVG en Discount dins de la zona OTE. 6. CONFIRMACIÓ: Espelma de rebuig o BOS alcista en M5/M1. 7. ENTRADA: Buy a l'OB/FVG. SL sota l'estructura. TP a la pròxima zona de liquiditat (BSL).",
            },
          },
        ],
        keyTakeaways: {
          es: ["Necesitas TODOS los elementos del checklist", "Sin bias claro = No operar", "Sin Kill Zone = No operar", "Sin sweep de liquidez = Esperar"],
          en: ["You need ALL checklist elements", "No clear bias = Don't trade", "No Kill Zone = Don't trade", "No liquidity sweep = Wait"],
          ca: ["Necessites TOTS els elements del checklist", "Sense bias clar = No operar", "Sense Kill Zone = No operar", "Sense sweep de liquiditat = Esperar"],
        },
        whenToBuy: {
          es: ["Bias alcista + Kill Zone + SSL sweep + BOS + OB/FVG en Discount + Confirmación"],
          en: ["Bullish bias + Kill Zone + SSL sweep + BOS + OB/FVG at Discount + Confirmation"],
          ca: ["Bias alcista + Kill Zone + SSL sweep + BOS + OB/FVG en Discount + Confirmació"],
        },
        whenToSell: {
          es: ["Este setup es para COMPRAR. Ver 'Setup Bearish' para ventas."],
          en: ["This setup is for BUYING. See 'Bearish Setup' for sells."],
          ca: ["Aquest setup és per COMPRAR. Veure 'Setup Bearish' per vendes."],
        },
      },
      {
        id: "bearish-setup",
        moduleId: "entry-models",
        title: { es: "Setup Bearish Completo", en: "Complete Bearish Setup", ca: "Setup Bearish Complet" },
        description: {
          es: "Paso a paso para una entrada de venta de alta probabilidad.",
          en: "Step by step for a high probability sell entry.",
          ca: "Pas a pas per a una entrada de venda d'alta probabilitat.",
        },
        sections: [
          {
            title: { es: "Checklist de Entrada Bearish", en: "Bearish Entry Checklist", ca: "Checklist d'Entrada Bearish" },
            content: {
              es: "1. BIAS: Daily/Weekly muestra estructura bajista. 2. TIMING: Estamos en una Kill Zone (London o NY AM). 3. LIQUIDEZ: Se ha producido un sweep de BSL (máximos barridos). 4. ESTRUCTURA: ChoCH o BOS bajista en H1/M15. 5. ZONA: El precio retrocede a un OB/FVG en Premium dentro de la zona OTE. 6. CONFIRMACIÓN: Vela de rechazo o BOS bajista en M5/M1. 7. ENTRADA: Sell en el OB/FVG. SL encima de la estructura. TP en la próxima zona de liquidez (SSL).",
              en: "1. BIAS: Daily/Weekly shows bearish structure. 2. TIMING: We're in a Kill Zone (London or NY AM). 3. LIQUIDITY: A BSL sweep has occurred (highs swept). 4. STRUCTURE: Bearish ChoCH or BOS on H1/M15. 5. ZONE: Price pulls back to an OB/FVG at Premium within OTE zone. 6. CONFIRMATION: Rejection candle or bearish BOS on M5/M1. 7. ENTRY: Sell at the OB/FVG. SL above structure. TP at the next liquidity zone (SSL).",
              ca: "1. BIAS: Daily/Weekly mostra estructura baixista. 2. TIMING: Estem en una Kill Zone (London o NY AM). 3. LIQUIDITAT: S'ha produït un sweep de BSL (màxims escombrats). 4. ESTRUCTURA: ChoCH o BOS baixista en H1/M15. 5. ZONA: El preu retrocedeix a un OB/FVG en Premium dins de la zona OTE. 6. CONFIRMACIÓ: Espelma de rebuig o BOS baixista en M5/M1. 7. ENTRADA: Sell a l'OB/FVG. SL sobre l'estructura. TP a la pròxima zona de liquiditat (SSL).",
            },
          },
        ],
        keyTakeaways: {
          es: ["Misma disciplina que el setup bullish pero invertido", "BSL sweep en vez de SSL sweep", "OB/FVG en Premium en vez de Discount", "TP en SSL (mínimos)"],
          en: ["Same discipline as bullish setup but inverted", "BSL sweep instead of SSL sweep", "OB/FVG at Premium instead of Discount", "TP at SSL (lows)"],
          ca: ["Mateixa disciplina que el setup bullish però invertit", "BSL sweep en lloc de SSL sweep", "OB/FVG en Premium en lloc de Discount", "TP en SSL (mínims)"],
        },
        whenToBuy: {
          es: ["Este setup es para VENDER. Ver 'Setup Bullish' para compras."],
          en: ["This setup is for SELLING. See 'Bullish Setup' for buys."],
          ca: ["Aquest setup és per VENDRE. Veure 'Setup Bullish' per compres."],
        },
        whenToSell: {
          es: ["Bias bajista + Kill Zone + BSL sweep + BOS + OB/FVG en Premium + Confirmación"],
          en: ["Bearish bias + Kill Zone + BSL sweep + BOS + OB/FVG at Premium + Confirmation"],
          ca: ["Bias baixista + Kill Zone + BSL sweep + BOS + OB/FVG en Premium + Confirmació"],
        },
      },
    ],
  },

  // MODULE 7: RISK MANAGEMENT
  {
    id: "risk-management",
    index: 6,
    title: { es: "Gestión del Riesgo", en: "Risk Management", ca: "Gestió del Risc" },
    description: {
      es: "Position sizing, stop loss placement y protección del capital.",
      en: "Position sizing, stop loss placement and capital protection.",
      ca: "Position sizing, stop loss placement i protecció del capital.",
    },
    color: "red",
    icon: "Shield",
    lessons: [
      {
        id: "position-sizing",
        moduleId: "risk-management",
        title: { es: "Position Sizing", en: "Position Sizing", ca: "Position Sizing" },
        description: {
          es: "Cómo calcular el tamaño correcto de cada operación.",
          en: "How to calculate the correct size for each trade.",
          ca: "Com calcular la mida correcta de cada operació.",
        },
        sections: [
          {
            title: { es: "Reglas de Position Sizing", en: "Position Sizing Rules", ca: "Regles de Position Sizing" },
            content: {
              es: "Regla #1: Nunca arriesgues más del 1-2% de tu cuenta por operación. Regla #2: Calcula el tamaño del lote ANTES de entrar. Fórmula: Tamaño Lote = (Cuenta × %Riesgo) / (SL en pips × Valor pip). Regla #3: Si pierdes 3 operaciones seguidas, para de operar ese día. Regla #4: Límite de pérdida diario: 3% del capital. Límite de pérdida semanal: 5%. El position sizing correcto es lo que separa a traders ganadores de perdedores a largo plazo.",
              en: "Rule #1: Never risk more than 1-2% of your account per trade. Rule #2: Calculate lot size BEFORE entering. Formula: Lot Size = (Account × %Risk) / (SL in pips × Pip value). Rule #3: If you lose 3 trades in a row, stop trading for the day. Rule #4: Daily loss limit: 3% of capital. Weekly loss limit: 5%. Correct position sizing is what separates winning traders from losing ones long term.",
              ca: "Regla #1: Mai arrisquis més del 1-2% del teu compte per operació. Regla #2: Calcula la mida del lot ABANS d'entrar. Fórmula: Mida Lot = (Compte × %Risc) / (SL en pips × Valor pip). Regla #3: Si perds 3 operacions seguides, para d'operar aquell dia. Regla #4: Límit de pèrdua diari: 3% del capital. Límit de pèrdua setmanal: 5%. El position sizing correcte és el que separa traders guanyadors de perdedors a llarg termini.",
            },
          },
        ],
        keyTakeaways: {
          es: ["Máximo 1-2% de riesgo por operación", "Calcula ANTES de entrar", "3 pérdidas seguidas = parar", "Máximo 3% pérdida diaria"],
          en: ["Maximum 1-2% risk per trade", "Calculate BEFORE entering", "3 consecutive losses = stop", "Maximum 3% daily loss"],
          ca: ["Màxim 1-2% de risc per operació", "Calcula ABANS d'entrar", "3 pèrdues seguides = parar", "Màxim 3% pèrdua diària"],
        },
        whenToBuy: {
          es: ["Solo si el riesgo de la operación es ≤ 1-2% de tu cuenta", "Solo si no has alcanzado tu límite diario de pérdidas"],
          en: ["Only if the trade risk is ≤ 1-2% of your account", "Only if you haven't reached your daily loss limit"],
          ca: ["Només si el risc de l'operació és ≤ 1-2% del teu compte", "Només si no has assolit el teu límit diari de pèrdues"],
        },
        whenToSell: {
          es: ["Mismas reglas que para comprar: gestión del riesgo es igual en ambas direcciones"],
          en: ["Same rules as buying: risk management is the same in both directions"],
          ca: ["Mateixes regles que per comprar: gestió del risc és igual en ambdues direccions"],
        },
      },
    ],
  },

  // MODULE 8: PERFORMANCE
  {
    id: "performance",
    index: 7,
    title: { es: "Rendimiento", en: "Performance", ca: "Rendiment" },
    description: {
      es: "Métricas de trading, journaling y cómo mejorar constantemente.",
      en: "Trading metrics, journaling and how to constantly improve.",
      ca: "Mètriques de trading, journaling i com millorar constantment.",
    },
    color: "orange",
    icon: "TrendingUp",
    lessons: [
      {
        id: "trading-metrics",
        moduleId: "performance",
        title: { es: "Métricas de Trading", en: "Trading Metrics", ca: "Mètriques de Trading" },
        description: {
          es: "Win Rate, Profit Factor, Expectancy y más.",
          en: "Win Rate, Profit Factor, Expectancy and more.",
          ca: "Win Rate, Profit Factor, Expectancy i més.",
        },
        sections: [
          {
            title: { es: "Métricas Esenciales", en: "Essential Metrics", ca: "Mètriques Essencials" },
            content: {
              es: "Win Rate: Porcentaje de trades ganadores. Con R:R de 1:2, solo necesitas >33% de win rate para ser rentable. Profit Factor: Beneficio bruto / Pérdida bruta. Debe ser >1.5. Expectancy: (Win% × Avg Win) - (Loss% × Avg Loss). Debe ser positiva. Max Drawdown: Máxima caída del capital desde un pico. Mantener bajo 10%. Sharpe Ratio: Retorno ajustado al riesgo. >1 es bueno, >2 es excelente. Estas métricas te dicen OBJETIVAMENTE si tu estrategia funciona.",
              en: "Win Rate: Percentage of winning trades. With 1:2 R:R, you only need >33% win rate to be profitable. Profit Factor: Gross profit / Gross loss. Should be >1.5. Expectancy: (Win% × Avg Win) - (Loss% × Avg Loss). Must be positive. Max Drawdown: Maximum capital decline from a peak. Keep under 10%. Sharpe Ratio: Risk-adjusted return. >1 is good, >2 is excellent. These metrics tell you OBJECTIVELY if your strategy works.",
              ca: "Win Rate: Percentatge de trades guanyadors. Amb R:R de 1:2, només necessites >33% de win rate per ser rendible. Profit Factor: Benefici brut / Pèrdua bruta. Ha de ser >1.5. Expectancy: (Win% × Avg Win) - (Loss% × Avg Loss). Ha de ser positiva. Max Drawdown: Màxima caiguda del capital des d'un pic. Mantenir sota 10%. Sharpe Ratio: Retorn ajustat al risc. >1 és bo, >2 és excel·lent. Aquestes mètriques et diuen OBJECTIVAMENT si la teva estratègia funciona.",
            },
          },
        ],
        keyTakeaways: {
          es: ["Con R:R 1:2, solo necesitas 33% win rate", "Profit Factor > 1.5 para ser rentable", "Lleva un journal de TODAS tus operaciones", "Revisa métricas semanalmente"],
          en: ["With 1:2 R:R, you only need 33% win rate", "Profit Factor > 1.5 to be profitable", "Keep a journal of ALL your trades", "Review metrics weekly"],
          ca: ["Amb R:R 1:2, només necessites 33% win rate", "Profit Factor > 1.5 per ser rendible", "Porta un journal de TOTES les teves operacions", "Revisa mètriques setmanalment"],
        },
        whenToBuy: {
          es: ["Cuando tu estrategia muestra expectancy positiva", "Cuando has hecho backtesting con >100 trades"],
          en: ["When your strategy shows positive expectancy", "When you've backtested with >100 trades"],
          ca: ["Quan la teva estratègia mostra expectancy positiva", "Quan has fet backtesting amb >100 trades"],
        },
        whenToSell: {
          es: ["Mismas condiciones: operar solo con estrategia probada estadísticamente"],
          en: ["Same conditions: only trade with a statistically proven strategy"],
          ca: ["Mateixes condicions: operar només amb estratègia provada estadísticament"],
        },
      },
    ],
  },
];

// Helper to get all lessons
export function getAllLessons() {
  return academyModules.flatMap((m) => m.lessons);
}

// Helper to get a specific module
export function getModule(moduleId: string) {
  return academyModules.find((m) => m.id === moduleId);
}

// Helper to get a specific lesson
export function getLesson(moduleId: string, lessonId: string) {
  const mod = getModule(moduleId);
  return mod?.lessons.find((l) => l.id === lessonId);
}

// Helper to get total lesson count
export function getTotalLessonCount() {
  return academyModules.reduce((acc, m) => acc + m.lessons.length, 0);
}
