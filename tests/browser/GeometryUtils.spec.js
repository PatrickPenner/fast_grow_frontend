/* eslint-disable no-undef */
import { expect } from 'chai'
import * as NGL from 'ngl'
import { GeometryUtils } from '@/utils/GeometryUtils'

describe('GeometryUtils', () => {
  let stage

  before(function () {
    const element = document.createElement('div')
    element.setAttribute('id', 'viewport')
    document.body.append(element)
    /* Only create one NGL per test suite. Creating and destroying too many
       NGL instances results in strange non-deterministic errors */
    stage = new NGL.Stage('viewport')
  })

  after(function () {
    stage.dispose()
    document.getElementById('viewport').remove()
  })

  afterEach(function () {
    stage.compList.forEach((component) => {
      stage.removeComponent(component)
    })
  })

  it('makes a bond marker', () => {
    const anchorPosition = [0, 0, 0]
    const linkerPosition = [1, 0, 0]
    const component = GeometryUtils.makeExitBondMarker(stage, anchorPosition, linkerPosition)
    // eslint-disable-next-line no-unused-expressions
    expect(component).to.not.be.undefined
    // eslint-disable-next-line no-unused-expressions
    expect(component.visible).to.be.false
    expect(stage.compList.length).to.equal(1)
    const shape = component.shape
    expect(shape.arrowPosition1).to.eql(anchorPosition)
    expect(shape.arrowPosition2).to.eql(linkerPosition)
  })

  it('makes an hbond interaction', () => {
    const interaction = {
      ligandInteraction: {
        position: [
          -20.499,
          24.1,
          -25.774
        ],
        type: 'ACCEPTOR'
      },
      score: 0.11417357582581605,
      siteInteraction: {
        position: [
          -17.618,
          26.215,
          -26.535
        ],
        type: 'DONOR'
      }
    }
    const component = GeometryUtils.makeHBondInteraction(stage, interaction)
    // eslint-disable-next-line no-unused-expressions
    expect(component).to.not.be.undefined
    // eslint-disable-next-line no-unused-expressions
    expect(component.visible).to.be.false
    expect(stage.compList.length).to.equal(1)
    const shape = component.shape
    expect(shape.cylinderPosition1).to.eql(interaction.ligandInteraction.position)
    expect(shape.cylinderPosition2).to.eql(interaction.siteInteraction.position)
  })

  it('makes an hbond point', () => {
    const interaction = {
      position: [
        -27.55321965136167,
        16.69443911623349,
        -18.314276453143897
      ],
      type: 'ACCEPTOR'
    }
    const component = GeometryUtils.makeHBondPoint(stage, interaction)
    // eslint-disable-next-line no-unused-expressions
    expect(component).to.not.be.undefined
    // eslint-disable-next-line no-unused-expressions
    expect(component.visible).to.be.false
    expect(stage.compList.length).to.equal(1)
    const shape = component.shape
    expect(shape.spherePosition).to.eql(interaction.position)
  })

  it('makes a hydrophobic interaction', () => {
    const interaction = {
      ligandInteraction: {
        position: [
          -22.992,
          26.252,
          -28.579
        ],
        type: 'HYDROPHOBIC'
      },
      score: 0.9418095873391782,
      siteInteraction: {
        position: [
          -25.349,
          28.874,
          -28.88
        ],
        type: 'HYDROPHOBIC'
      }
    }
    const component = GeometryUtils.makeHydrophobicPoint(stage, interaction.ligandInteraction)
    // eslint-disable-next-line no-unused-expressions
    expect(component).to.not.be.undefined
    // eslint-disable-next-line no-unused-expressions
    expect(component.visible).to.be.false
    expect(stage.compList.length).to.equal(1)
    const shape = component.shape
    expect(shape.spherePosition).to.eql(interaction.ligandInteraction.position)
  })
})
