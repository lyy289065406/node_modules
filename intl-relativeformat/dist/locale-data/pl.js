/* @generated */	
IntlRelativeFormat.__addLocaleData({"locale":"pl","pluralRuleFunction":function(n, ord
) {
  var s = String(n).split('.'), i = s[0], v0 = !s[1], i10 = i.slice(-1),
      i100 = i.slice(-2);
  if (ord) return 'other';
  return (n == 1 && v0) ? 'one'
      : (v0 && (i10 >= 2 && i10 <= 4) && (i100 < 12
          || i100 > 14)) ? 'few'
      : (v0 && i != 1 && (i10 == 0 || i10 == 1)
          || v0 && (i10 >= 5 && i10 <= 9)
          || v0 && (i100 >= 12 && i100 <= 14)) ? 'many'
      : 'other';
},"fields":{"year":{"displayName":"rok","relative":{"0":"w tym roku","1":"w przyszłym roku","-1":"w zeszłym roku"},"relativeTime":{"future":{"one":"za {0} rok","few":"za {0} lata","many":"za {0} lat","other":"za {0} roku"},"past":{"one":"{0} rok temu","few":"{0} lata temu","many":"{0} lat temu","other":"{0} roku temu"}}},"year-short":{"displayName":"r.","relative":{"0":"w tym roku","1":"w przyszłym roku","-1":"w zeszłym roku"},"relativeTime":{"future":{"one":"za {0} rok","few":"za {0} lata","many":"za {0} lat","other":"za {0} roku"},"past":{"one":"{0} rok temu","few":"{0} lata temu","many":"{0} lat temu","other":"{0} roku temu"}}},"month":{"displayName":"miesiąc","relative":{"0":"w tym miesiącu","1":"w przyszłym miesiącu","-1":"w zeszłym miesiącu"},"relativeTime":{"future":{"one":"za {0} miesiąc","few":"za {0} miesiące","many":"za {0} miesięcy","other":"za {0} miesiąca"},"past":{"one":"{0} miesiąc temu","few":"{0} miesiące temu","many":"{0} miesięcy temu","other":"{0} miesiąca temu"}}},"month-short":{"displayName":"mies.","relative":{"0":"w tym miesiącu","1":"w przyszłym miesiącu","-1":"w zeszłym miesiącu"},"relativeTime":{"future":{"one":"za {0} mies.","few":"za {0} mies.","many":"za {0} mies.","other":"za {0} mies."},"past":{"one":"{0} mies. temu","few":"{0} mies. temu","many":"{0} mies. temu","other":"{0} mies. temu"}}},"week":{"displayName":"tydzień","relativePeriod":"tydzień {0}","relative":{"0":"w tym tygodniu","1":"w przyszłym tygodniu","-1":"w zeszłym tygodniu"},"relativeTime":{"future":{"one":"za {0} tydzień","few":"za {0} tygodnie","many":"za {0} tygodni","other":"za {0} tygodnia"},"past":{"one":"{0} tydzień temu","few":"{0} tygodnie temu","many":"{0} tygodni temu","other":"{0} tygodnia temu"}}},"week-short":{"displayName":"tydz.","relativePeriod":"tydzień {0}","relative":{"0":"w tym tygodniu","1":"w przyszłym tygodniu","-1":"w zeszłym tygodniu"},"relativeTime":{"future":{"one":"za {0} tydz.","few":"za {0} tyg.","many":"za {0} tyg.","other":"za {0} tyg."},"past":{"one":"{0} tydz. temu","few":"{0} tyg. temu","many":"{0} tyg. temu","other":"{0} tyg. temu"}}},"day":{"displayName":"dzień","relative":{"0":"dzisiaj","1":"jutro","2":"pojutrze","-2":"przedwczoraj","-1":"wczoraj"},"relativeTime":{"future":{"one":"za {0} dzień","few":"za {0} dni","many":"za {0} dni","other":"za {0} dnia"},"past":{"one":"{0} dzień temu","few":"{0} dni temu","many":"{0} dni temu","other":"{0} dnia temu"}}},"day-short":{"displayName":"dzień","relative":{"0":"dzisiaj","1":"jutro","2":"pojutrze","-2":"przedwczoraj","-1":"wczoraj"},"relativeTime":{"future":{"one":"za {0} dzień","few":"za {0} dni","many":"za {0} dni","other":"za {0} dnia"},"past":{"one":"{0} dzień temu","few":"{0} dni temu","many":"{0} dni temu","other":"{0} dnia temu"}}},"hour":{"displayName":"godzina","relative":{"0":"ta godzina"},"relativeTime":{"future":{"one":"za {0} godzinę","few":"za {0} godziny","many":"za {0} godzin","other":"za {0} godziny"},"past":{"one":"{0} godzinę temu","few":"{0} godziny temu","many":"{0} godzin temu","other":"{0} godziny temu"}}},"hour-short":{"displayName":"godz.","relative":{"0":"ta godzina"},"relativeTime":{"future":{"one":"za {0} godz.","few":"za {0} godz.","many":"za {0} godz.","other":"za {0} godz."},"past":{"one":"{0} godz. temu","few":"{0} godz. temu","many":"{0} godz. temu","other":"{0} godz. temu"}}},"minute":{"displayName":"minuta","relative":{"0":"ta minuta"},"relativeTime":{"future":{"one":"za {0} minutę","few":"za {0} minuty","many":"za {0} minut","other":"za {0} minuty"},"past":{"one":"{0} minutę temu","few":"{0} minuty temu","many":"{0} minut temu","other":"{0} minuty temu"}}},"minute-short":{"displayName":"min","relative":{"0":"ta minuta"},"relativeTime":{"future":{"one":"za {0} min","few":"za {0} min","many":"za {0} min","other":"za {0} min"},"past":{"one":"{0} min temu","few":"{0} min temu","many":"{0} min temu","other":"{0} min temu"}}},"second":{"displayName":"sekunda","relative":{"0":"teraz"},"relativeTime":{"future":{"one":"za {0} sekundę","few":"za {0} sekundy","many":"za {0} sekund","other":"za {0} sekundy"},"past":{"one":"{0} sekundę temu","few":"{0} sekundy temu","many":"{0} sekund temu","other":"{0} sekundy temu"}}},"second-short":{"displayName":"sek.","relative":{"0":"teraz"},"relativeTime":{"future":{"one":"za {0} sek.","few":"za {0} sek.","many":"za {0} sek.","other":"za {0} sek."},"past":{"one":"{0} sek. temu","few":"{0} sek. temu","many":"{0} sek. temu","other":"{0} sek. temu"}}}}})