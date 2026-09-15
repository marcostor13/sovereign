/**
 * Tests de las reglas de calificación.  `npm test`
 * (Node ≥ 22.6 ejecuta TypeScript directamente con `node --test`.)
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { qualifyIul, qualifyWholeLife, type IulAnswers, type WholeLifeAnswers } from './qualify.ts';

const STATES = ['FL', 'TX'];

const iul = (over: Partial<IulAnswers> = {}): IulAnswers => ({
  objetivo: 'familia',
  edad: '28-40',
  estado: 'FL',
  aporte: '200-500',
  fondoEmergencia: 'si',
  horizonte: '5-10',
  seguroActual: 'term',
  ...over,
});

test('IUL: perfil base califica (A)', () => {
  const q = qualifyIul(iul(), STATES);
  assert.equal(q.result, 'A');
  assert.equal(q.qualifies, true);
  assert.equal(q.score, 1); // sólo fondo de emergencia
  assert.equal(q.priority, 'normal');
});

test('IUL: aporte menor a US$200 no califica (B)', () => {
  assert.equal(qualifyIul(iul({ aporte: '<200' }), STATES).result, 'B');
});

test('IUL: horizonte menor a 5 años va a nurturing (B)', () => {
  assert.equal(qualifyIul(iul({ horizonte: '<5' }), STATES).result, 'B');
});

test('IUL: sin fondo de emergencia va a nurturing aunque cumpla lo demás (B)', () => {
  const q = qualifyIul(iul({ fondoEmergencia: 'no' }), STATES);
  assert.equal(q.result, 'B');
  assert.equal(q.qualifies, false);
});

test('IUL: fondo "en proceso" sí permite el resultado A', () => {
  assert.equal(qualifyIul(iul({ fondoEmergencia: 'en-proceso' }), STATES).result, 'A');
});

test('IUL: 66+ no califica', () => {
  assert.equal(qualifyIul(iul({ edad: '66+' }), STATES).result, 'B');
});

test('IUL: estado sin licencia devuelve C', () => {
  assert.equal(qualifyIul(iul({ estado: 'CA' }), STATES).result, 'C');
});

test('IUL: sin fondo de emergencia y fuera de estado prioriza C', () => {
  assert.equal(qualifyIul(iul({ estado: 'NY', fondoEmergencia: 'no' }), STATES).result, 'C');
});

test('IUL: score máximo y prioridad alta', () => {
  const q = qualifyIul(
    iul({ aporte: '2500+', horizonte: '>10', objetivo: 'legado', seguroActual: 'no', fondoEmergencia: 'si' }),
    STATES,
  );
  assert.equal(q.score, 7);
  assert.equal(q.priority, 'alta');
});

test('IUL: valores fuera de catálogo no califican', () => {
  assert.equal(qualifyIul(iul({ edad: 'cualquiera' }), STATES).qualifies, false);
  assert.equal(qualifyIul(iul({ aporte: 'mucho' }), STATES).qualifies, false);
});

const wl = (over: Partial<WholeLifeAnswers> = {}): WholeLifeAnswers => ({
  aniosNegocio: '2-5',
  ingresos: '100-250k',
  excedente: '500-1500',
  fondoEmergencia: 'parcial',
  uso: ['inventario'],
  horizonte: '10-15',
  valora: 'balance',
  edad: '31-45',
  contador: 'si',
  estado: 'FL',
  ...over,
});

test('WL: perfil base califica (A) con score 2', () => {
  const q = qualifyWholeLife(wl(), STATES);
  assert.equal(q.result, 'A');
  assert.equal(q.score, 2); // excedente 1 + horizonte 10-15 1
  assert.equal(q.priority, 'normal');
});

test('WL: excedente menor a US$500 no califica (B)', () => {
  assert.equal(qualifyWholeLife(wl({ excedente: '<500' }), STATES).result, 'B');
});

test('WL: horizonte menor a 10 años no califica (B)', () => {
  assert.equal(qualifyWholeLife(wl({ horizonte: '<10' }), STATES).result, 'B');
});

test('WL: sin fondo de emergencia no califica (B)', () => {
  assert.equal(qualifyWholeLife(wl({ fondoEmergencia: 'no' }), STATES).result, 'B');
});

test('WL: mayor de 65 no califica', () => {
  assert.equal(qualifyWholeLife(wl({ edad: '66+' }), STATES).qualifies, false);
});

test('WL: estado sin licencia devuelve C', () => {
  assert.equal(qualifyWholeLife(wl({ estado: 'IL' }), STATES).result, 'C');
});

test('WL: prefiere crecimiento y califica → D (comparar con IUL)', () => {
  const q = qualifyWholeLife(wl({ valora: 'crecimiento' }), STATES);
  assert.equal(q.result, 'D');
  assert.equal(q.qualifies, true);
});

test('WL: prefiere crecimiento pero no califica → B, no D', () => {
  assert.equal(qualifyWholeLife(wl({ valora: 'crecimiento', excedente: '<500' }), STATES).result, 'B');
});

test('WL: score alto asigna prioridad alta', () => {
  const q = qualifyWholeLife(
    wl({ excedente: '>5000', horizonte: '>15', ingresos: '>1m', aniosNegocio: '>5', valora: 'garantias', fondoEmergencia: 'si' }),
    STATES,
  );
  assert.equal(q.score, 10);
  assert.equal(q.priority, 'alta');
});
