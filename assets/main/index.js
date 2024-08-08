System.register("chunks:///_virtual/debug-view-runtime-control.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Color, Canvas, UITransform, instantiate, Label, RichText, Toggle, Button, director, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Color = module.Color;
      Canvas = module.Canvas;
      UITransform = module.UITransform;
      instantiate = module.instantiate;
      Label = module.Label;
      RichText = module.RichText;
      Toggle = module.Toggle;
      Button = module.Button;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "b2bd1+njXxJxaFY3ymm06WU", "debug-view-runtime-control", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var DebugViewRuntimeControl = exports('DebugViewRuntimeControl', (_dec = ccclass('internal.DebugViewRuntimeControl'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DebugViewRuntimeControl, _Component);
        function DebugViewRuntimeControl() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "compositeModeToggle", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "singleModeToggle", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "EnableAllCompositeModeButton", _descriptor3, _assertThisInitialized(_this));
          _this._single = 0;
          _this.strSingle = ['No Single Debug', 'Vertex Color', 'Vertex Normal', 'Vertex Tangent', 'World Position', 'Vertex Mirror', 'Face Side', 'UV0', 'UV1', 'UV Lightmap', 'Project Depth', 'Linear Depth', 'Fragment Normal', 'Fragment Tangent', 'Fragment Binormal', 'Base Color', 'Diffuse Color', 'Specular Color', 'Transparency', 'Metallic', 'Roughness', 'Specular Intensity', 'IOR', 'Direct Diffuse', 'Direct Specular', 'Direct All', 'Env Diffuse', 'Env Specular', 'Env All', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Fresnel', 'Direct Transmit Diffuse', 'Direct Transmit Specular', 'Env Transmit Diffuse', 'Env Transmit Specular', 'Transmit All', 'Direct Internal Specular', 'Env Internal Specular', 'Internal All', 'Fog'];
          _this.strComposite = ['Direct Diffuse', 'Direct Specular', 'Env Diffuse', 'Env Specular', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Normal Map', 'Fog', 'Tone Mapping', 'Gamma Correction', 'Fresnel', 'Transmit Diffuse', 'Transmit Specular', 'Internal Specular', 'TT'];
          _this.strMisc = ['CSM Layer Coloration', 'Lighting With Albedo'];
          _this.compositeModeToggleList = [];
          _this.singleModeToggleList = [];
          _this.miscModeToggleList = [];
          _this.textComponentList = [];
          _this.labelComponentList = [];
          _this.textContentList = [];
          _this.hideButtonLabel = void 0;
          _this._currentColorIndex = 0;
          _this.strColor = ['<color=#ffffff>', '<color=#000000>', '<color=#ff0000>', '<color=#00ff00>', '<color=#0000ff>'];
          _this.color = [Color.WHITE, Color.BLACK, Color.RED, Color.GREEN, Color.BLUE];
          return _this;
        }
        var _proto = DebugViewRuntimeControl.prototype;
        _proto.start = function start() {
          // get canvas resolution
          var canvas = this.node.parent.getComponent(Canvas);
          if (!canvas) {
            console.error('debug-view-runtime-control should be child of Canvas');
            return;
          }
          var uiTransform = this.node.parent.getComponent(UITransform);
          var halfScreenWidth = uiTransform.width * 0.5;
          var halfScreenHeight = uiTransform.height * 0.5;
          var x = -halfScreenWidth + halfScreenWidth * 0.1,
            y = halfScreenHeight - halfScreenHeight * 0.1;
          var width = 200,
            height = 20;

          // new nodes
          var miscNode = this.node.getChildByName('MiscMode');
          var buttonNode = instantiate(miscNode);
          buttonNode.parent = this.node;
          buttonNode.name = 'Buttons';
          var titleNode = instantiate(miscNode);
          titleNode.parent = this.node;
          titleNode.name = 'Titles';

          // title
          for (var i = 0; i < 2; i++) {
            var newLabel = instantiate(this.EnableAllCompositeModeButton.getChildByName('Label'));
            newLabel.setPosition(x + (i > 0 ? 50 + width * 2 : 150), y, 0.0);
            newLabel.setScale(0.75, 0.75, 0.75);
            newLabel.parent = titleNode;
            var _labelComponent = newLabel.getComponent(Label);
            _labelComponent.string = i ? '----------Composite Mode----------' : '----------Single Mode----------';
            _labelComponent.color = Color.WHITE;
            _labelComponent.overflow = 0;
            this.labelComponentList[this.labelComponentList.length] = _labelComponent;
          }
          y -= height;
          // single
          var currentRow = 0;
          for (var _i = 0; _i < this.strSingle.length; _i++, currentRow++) {
            if (_i === this.strSingle.length >> 1) {
              x += width;
              currentRow = 0;
            }
            var newNode = _i ? instantiate(this.singleModeToggle) : this.singleModeToggle;
            newNode.setPosition(x, y - height * currentRow, 0.0);
            newNode.setScale(0.5, 0.5, 0.5);
            newNode.parent = this.singleModeToggle.parent;
            var textComponent = newNode.getComponentInChildren(RichText);
            textComponent.string = this.strSingle[_i];
            this.textComponentList[this.textComponentList.length] = textComponent;
            this.textContentList[this.textContentList.length] = textComponent.string;
            newNode.on(Toggle.EventType.TOGGLE, this.toggleSingleMode, this);
            this.singleModeToggleList[_i] = newNode;
          }
          x += width;
          // buttons
          this.EnableAllCompositeModeButton.setPosition(x + 15, y, 0.0);
          this.EnableAllCompositeModeButton.setScale(0.5, 0.5, 0.5);
          this.EnableAllCompositeModeButton.on(Button.EventType.CLICK, this.enableAllCompositeMode, this);
          this.EnableAllCompositeModeButton.parent = buttonNode;
          var labelComponent = this.EnableAllCompositeModeButton.getComponentInChildren(Label);
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          var changeColorButton = instantiate(this.EnableAllCompositeModeButton);
          changeColorButton.setPosition(x + 90, y, 0.0);
          changeColorButton.setScale(0.5, 0.5, 0.5);
          changeColorButton.on(Button.EventType.CLICK, this.changeTextColor, this);
          changeColorButton.parent = buttonNode;
          labelComponent = changeColorButton.getComponentInChildren(Label);
          labelComponent.string = 'TextColor';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          var HideButton = instantiate(this.EnableAllCompositeModeButton);
          HideButton.setPosition(x + 200, y, 0.0);
          HideButton.setScale(0.5, 0.5, 0.5);
          HideButton.on(Button.EventType.CLICK, this.hideUI, this);
          HideButton.parent = this.node.parent;
          labelComponent = HideButton.getComponentInChildren(Label);
          labelComponent.string = 'Hide UI';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          this.hideButtonLabel = labelComponent;

          // misc
          y -= 40;
          for (var _i2 = 0; _i2 < this.strMisc.length; _i2++) {
            var _newNode = instantiate(this.compositeModeToggle);
            _newNode.setPosition(x, y - height * _i2, 0.0);
            _newNode.setScale(0.5, 0.5, 0.5);
            _newNode.parent = miscNode;
            var _textComponent = _newNode.getComponentInChildren(RichText);
            _textComponent.string = this.strMisc[_i2];
            this.textComponentList[this.textComponentList.length] = _textComponent;
            this.textContentList[this.textContentList.length] = _textComponent.string;
            var toggleComponent = _newNode.getComponent(Toggle);
            toggleComponent.isChecked = _i2 ? true : false;
            _newNode.on(Toggle.EventType.TOGGLE, _i2 ? this.toggleLightingWithAlbedo : this.toggleCSMColoration, this);
            this.miscModeToggleList[_i2] = _newNode;
          }

          // composite
          y -= 150;
          for (var _i3 = 0; _i3 < this.strComposite.length; _i3++) {
            var _newNode2 = _i3 ? instantiate(this.compositeModeToggle) : this.compositeModeToggle;
            _newNode2.setPosition(x, y - height * _i3, 0.0);
            _newNode2.setScale(0.5, 0.5, 0.5);
            _newNode2.parent = this.compositeModeToggle.parent;
            var _textComponent2 = _newNode2.getComponentInChildren(RichText);
            _textComponent2.string = this.strComposite[_i3];
            this.textComponentList[this.textComponentList.length] = _textComponent2;
            this.textContentList[this.textContentList.length] = _textComponent2.string;
            _newNode2.on(Toggle.EventType.TOGGLE, this.toggleCompositeMode, this);
            this.compositeModeToggleList[_i3] = _newNode2;
          }
        };
        _proto.isTextMatched = function isTextMatched(textUI, textDescription) {
          var tempText = new String(textUI);
          var findIndex = tempText.search('>');
          if (findIndex === -1) {
            return textUI === textDescription;
          } else {
            tempText = tempText.substr(findIndex + 1);
            tempText = tempText.substr(0, tempText.search('<'));
            return tempText === textDescription;
          }
        };
        _proto.toggleSingleMode = function toggleSingleMode(toggle) {
          var debugView = director.root.debugView;
          var textComponent = toggle.getComponentInChildren(RichText);
          for (var i = 0; i < this.strSingle.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strSingle[i])) {
              debugView.singleMode = i;
            }
          }
        };
        _proto.toggleCompositeMode = function toggleCompositeMode(toggle) {
          var debugView = director.root.debugView;
          var textComponent = toggle.getComponentInChildren(RichText);
          for (var i = 0; i < this.strComposite.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strComposite[i])) {
              debugView.enableCompositeMode(i, toggle.isChecked);
            }
          }
        };
        _proto.toggleLightingWithAlbedo = function toggleLightingWithAlbedo(toggle) {
          var debugView = director.root.debugView;
          debugView.lightingWithAlbedo = toggle.isChecked;
        };
        _proto.toggleCSMColoration = function toggleCSMColoration(toggle) {
          var debugView = director.root.debugView;
          debugView.csmLayerColoration = toggle.isChecked;
        };
        _proto.enableAllCompositeMode = function enableAllCompositeMode(button) {
          var debugView = director.root.debugView;
          debugView.enableAllCompositeMode(true);
          for (var i = 0; i < this.compositeModeToggleList.length; i++) {
            var _toggleComponent = this.compositeModeToggleList[i].getComponent(Toggle);
            _toggleComponent.isChecked = true;
          }
          var toggleComponent = this.miscModeToggleList[0].getComponent(Toggle);
          toggleComponent.isChecked = false;
          debugView.csmLayerColoration = false;
          toggleComponent = this.miscModeToggleList[1].getComponent(Toggle);
          toggleComponent.isChecked = true;
          debugView.lightingWithAlbedo = true;
        };
        _proto.hideUI = function hideUI(button) {
          var titleNode = this.node.getChildByName('Titles');
          var activeValue = !titleNode.active;
          this.singleModeToggleList[0].parent.active = activeValue;
          this.miscModeToggleList[0].parent.active = activeValue;
          this.compositeModeToggleList[0].parent.active = activeValue;
          this.EnableAllCompositeModeButton.parent.active = activeValue;
          titleNode.active = activeValue;
          this.hideButtonLabel.string = activeValue ? 'Hide UI' : 'Show UI';
        };
        _proto.changeTextColor = function changeTextColor(button) {
          this._currentColorIndex++;
          if (this._currentColorIndex >= this.strColor.length) {
            this._currentColorIndex = 0;
          }
          for (var i = 0; i < this.textComponentList.length; i++) {
            this.textComponentList[i].string = this.strColor[this._currentColorIndex] + this.textContentList[i] + '</color>';
          }
          for (var _i4 = 0; _i4 < this.labelComponentList.length; _i4++) {
            this.labelComponentList[_i4].color = this.color[this._currentColorIndex];
          }
        };
        _proto.onLoad = function onLoad() {};
        _proto.update = function update(deltaTime) {};
        return DebugViewRuntimeControl;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "compositeModeToggle", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "singleModeToggle", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "EnableAllCompositeModeButton", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Detail.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './SlotOrBolt.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createForOfIteratorHelperLoose, cclegacy, _decorator, RigidBody2D, WheelJoint2D, Collider2D, UITransform, Rect, ERigidBody2DType, Vec2, Component, SlotOrBolt;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      RigidBody2D = module.RigidBody2D;
      WheelJoint2D = module.WheelJoint2D;
      Collider2D = module.Collider2D;
      UITransform = module.UITransform;
      Rect = module.Rect;
      ERigidBody2DType = module.ERigidBody2DType;
      Vec2 = module.Vec2;
      Component = module.Component;
    }, function (module) {
      SlotOrBolt = module.SlotOrBolt;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "5f230XLWXlFb7HPKsSuLZzR", "Detail", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Detail = exports('Detail', (_dec = ccclass('Detail'), _dec2 = property(SlotOrBolt), _dec3 = property(Boolean), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Detail, _Component);
        function Detail() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "slotOrBolts", _descriptor, _assertThisInitialized(_this));
          _this.rigidBody = null;
          _this.wheelJoint = null;
          _initializerDefineProperty(_this, "isFallen", _descriptor2, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = Detail.prototype;
        _proto.onLoad = function onLoad() {
          var _this2 = this;
          this.rigidBody = this.getComponent(RigidBody2D);

          // Подписываемся на события изменения состояния от каждого SlotOrBolt
          this.slotOrBolts.forEach(function (sob) {
            if (sob) {
              sob.node.on('state-changed', _this2.updateDetailState, _this2);
            }
          });
          this.setStatic();
        };
        _proto.onDestroy = function onDestroy() {
          // Удаляем подписку при уничтожении объекта
          this.node.scene.off('state-changed', this.updateDetailState, this);
        };
        _proto.updateDetailState = function updateDetailState(sob) {
          if (this.isFallen === true) {
            return;
          }
          if (!sob || this.slotOrBolts.indexOf(sob) === -1) {
            console.log('ignore', sob ? sob.node.name : 'undefined sob');
            return; // Игнорируем изменения, если SlotOrBolt не относится к этой детали или sob равен undefined
          }

          // Проверяем, является ли sob болтом и касается ли он детали
          if (sob.isBolt() && !this.areBoltsTouching()) {
            console.log("Bolt " + sob.node.name + " is not touching the detail, exiting method.");
            return; // Если болт не касается детали, выходим из метода
          }

          var filledSoBs = this.slotOrBolts.filter(function (sob) {
            return sob && sob.isBolt();
          });
          var filledCount = filledSoBs.length;

          // Логируем всю информацию
          console.log("---------- Detail: " + this.node.name);
          console.log("Total SoBs: " + this.slotOrBolts.length);
          console.log("Filled SoBs: " + filledCount);

          // Логика поведения детали в зависимости от количества заполненных SoBs
          if (filledCount >= 2 && this.allBoltsTouching()) {
            console.log('-- 1 --');
            this.setStatic();
          } else if (filledCount === 1 && this.allBoltsTouching()) {
            console.log('-- 2 --');
            this.setDynamic();
            this.attachJoint(filledSoBs[0]);

            // Переключаем Joint для обновления
            this.getComponent(WheelJoint2D).enabled = false;
            this.getComponent(WheelJoint2D).enabled = true;
          }
          if (!this.areBoltsTouching()) {
            console.log('-- 3 --');
            this.isFallen = true;
            this.setDynamic();
            this.detachJoints();
          }
        };
        _proto.allBoltsTouching = function allBoltsTouching() {
          var _this3 = this;
          var answer = true;
          var filledSoBs = this.slotOrBolts.filter(function (sob) {
            return sob && sob.isBolt();
          });
          filledSoBs.forEach(function (sob, index) {
            answer = _this3.isColliding(sob.getComponent(Collider2D), _this3.getComponent(Collider2D));
            console.log("Touch? " + sob.node.name + " - ", answer);
            if (answer === false) {
              return false;
            }
          });
          return answer;
        }

        // Метод для ручной проверки соприкосновения коллайдеров
        ;

        _proto.areBoltsTouching = function areBoltsTouching() {
          var detailCollider = this.getComponent(Collider2D);
          if (!detailCollider) {
            console.error('Detail has no Collider2D');
            return false;
          }
          for (var _iterator = _createForOfIteratorHelperLoose(this.slotOrBolts), _step; !(_step = _iterator()).done;) {
            var sob = _step.value;
            if (sob.isBolt()) {
              var boltCollider = sob.getComponent(Collider2D);
              if (boltCollider && this.isColliding(detailCollider, boltCollider)) {
                return true; // Если хотя бы один болт касается детали, возвращаем true
              }
            }
          }

          return false; // Ни один из болтов не касается детали
        }

        // Метод для получения мирового BoundingBox узла
        ;

        _proto.getWorldBoundingBox = function getWorldBoundingBox(node) {
          var position = node.getWorldPosition();
          var scale = node.getWorldScale();
          var size = node.getComponent(UITransform).contentSize;

          // Учитываем масштаб
          var width = size.width * scale.x;
          var height = size.height * scale.y;

          // Создаем BoundingBox в мировых координатах
          return new Rect(position.x - width / 2, position.y - height / 2, width, height);
        }

        // Метод для проверки пересечения двух узлов
        ;

        _proto.isColliding = function isColliding(colliderA, colliderB) {
          var boxA = this.getWorldBoundingBox(colliderA.node);
          var boxB = this.getWorldBoundingBox(colliderB.node);
          var intersects = boxA.intersects(boxB);
          console.log("Colliders intersect: " + intersects);
          return intersects;
        };
        _proto.setStatic = function setStatic() {
          if (this.rigidBody) {
            this.rigidBody.type = ERigidBody2DType.Static;
            this.rigidBody.angularVelocity = 0;
            this.detachJoints();
          }
        };
        _proto.setDynamic = function setDynamic() {
          if (this.rigidBody) {
            this.rigidBody.angularVelocity = 1;
            this.rigidBody.type = ERigidBody2DType.Dynamic;
          }
        };
        _proto.attachJoint = function attachJoint(filledSoB) {
          if (!this.rigidBody || !filledSoB) {
            console.error('Missing RigidBody2D on Detail or invalid SlotOrBolt');
            return;
          }
          var boltRigidBody = filledSoB.getComponent(RigidBody2D);
          if (!boltRigidBody) {
            console.error('Missing RigidBody2D on SlotOrBolt');
            return;
          }

          // Проверка и отключение существующего WheelJoint2D
          if (this.wheelJoint) {
            this.wheelJoint.enabled = false;
          } else {
            // Проверяем, есть ли уже WheelJoint2D на объекте
            this.wheelJoint = this.getComponent(WheelJoint2D);
            if (!this.wheelJoint) {
              this.wheelJoint = this.addComponent(WheelJoint2D);
            }
          }

          // Вычисляем якорь относительно координат объекта детали
          var boltWorldPos = filledSoB.node.getWorldPosition();
          var detailWorldPos = this.node.getWorldPosition();
          var localAnchor = boltWorldPos.subtract(detailWorldPos);

          // Настройка WheelJoint2D
          this.wheelJoint.connectedBody = boltRigidBody;
          this.wheelJoint.anchor = new Vec2(localAnchor.x, localAnchor.y);
          this.wheelJoint.connectedAnchor = Vec2.ZERO;

          // Включаем WheelJoint2D после полной настройки
          this.wheelJoint.enabled = true;
          console.log("Attaching joint at anchor: (" + localAnchor.x + ", " + localAnchor.y + ")");

          // Пробуждаем физические тела
          this.rigidBody.wakeUp();
          boltRigidBody.wakeUp();
        };
        _proto.detachJoints = function detachJoints() {
          if (this.wheelJoint) {
            this.wheelJoint.enabled = false;
            this.wheelJoint.connectedBody = null;
          }
        };
        return Detail;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "slotOrBolts", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "isFallen", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Detail.ts', './SlotOrBolt.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Component, Detail, SlotOrBolt;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      Detail = module.Detail;
    }, function (module) {
      SlotOrBolt = module.SlotOrBolt;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "4723bNwB+RI5ope3rTDlVFu", "GameManager", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var GameManager = exports('GameManager', (_dec = ccclass('GameManager'), _dec2 = property(Detail), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GameManager, _Component);
        function GameManager() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "details", _descriptor, _assertThisInitialized(_this));
          _this.selectedBolt = null;
          return _this;
        }
        var _proto = GameManager.prototype;
        _proto.onLoad = function onLoad() {
          this.node.on('sob-clicked', this.onSoBClicked, this);
        };
        _proto.onDestroy = function onDestroy() {
          this.node.off('sob-clicked', this.onSoBClicked, this);
        };
        _proto.onSoBClicked = function onSoBClicked(sob) {
          if (this.selectedBolt) {
            if (!sob.isBolt()) {
              console.log('Swapping bolt and slot:', this.selectedBolt.node.name, sob.node.name);
              this.swapBoltSlot(this.selectedBolt, sob);
              this.selectedBolt = null;
            } else {
              this.selectedBolt = null;
            }
          } else if (sob.isBolt()) {
            this.selectedBolt = sob;
          } else {
            console.log('Clicked on an empty slot, no action');
          }
        };
        _proto.swapBoltSlot = function swapBoltSlot(bolt, slot) {
          if (!bolt || !slot) {
            console.error('Bolt or Slot is null');
            return;
          }
          bolt.setFilled(false);
          slot.setFilled(true);
          this.checkWinCondition(); // Проверяем победу после смены болта
        };

        _proto.checkWinCondition = function checkWinCondition() {
          var allDetailsFallen = this.details.every(function (detail) {
            var filledSoBs = detail.getComponents(SlotOrBolt).filter(function (sob) {
              return sob.isBolt();
            });
            return filledSoBs.length === 0;
          });
        };
        return GameManager;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "details", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./debug-view-runtime-control.ts', './Detail.ts', './GameManager.ts', './SceneController.ts', './SlotOrBolt.ts', './TelegramUserDisplay.ts', './telegram.mjs_cjs=&original=.js'], function () {
  return {
    setters: [null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/SceneController.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, director, Component;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "8f5fd/6OIBDTZeol5caOxnP", "SceneController", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var SceneController = exports('SceneController', (_dec = ccclass('SceneController'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(SceneController, _Component);
        function SceneController() {
          return _Component.apply(this, arguments) || this;
        }
        var _proto = SceneController.prototype;
        // Метод для перезапуска текущей сцены
        _proto.restartScene = function restartScene() {
          var currentScene = director.getScene().name;
          director.loadScene(currentScene);
        };
        return SceneController;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SlotOrBolt.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameManager.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, SpriteFrame, Button, Sprite, Component, GameManager;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      SpriteFrame = module.SpriteFrame;
      Button = module.Button;
      Sprite = module.Sprite;
      Component = module.Component;
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
      cclegacy._RF.push({}, "675beCfi7FJC7B9X6vkPTXm", "SlotOrBolt", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var SlotOrBolt = exports('SlotOrBolt', (_dec = ccclass('SlotOrBolt'), _dec2 = property(SpriteFrame), _dec3 = property(SpriteFrame), _dec4 = property(Button), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(SlotOrBolt, _Component);
        function SlotOrBolt() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "boltSprite", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "slotSprite", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "isFilled", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "button", _descriptor4, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = SlotOrBolt.prototype;
        _proto.onLoad = function onLoad() {
          this.updateSprite();
          if (this.button) {
            this.button.node.on(Button.EventType.CLICK, this.onClicked, this);
          } else {
            console.error('Button component not found on SlotOrBolt');
          }
        };
        _proto.onClicked = function onClicked() {
          console.log('SlotOrBolt clicked:', this.node.name);
          if (this.node && this.node.scene) {
            var gameManager = this.node.scene.getComponentInChildren(GameManager);
            if (gameManager && gameManager.node) {
              gameManager.node.emit('sob-clicked', this); // Сообщаем GameManager о клике
            } else {
              console.error('GameManager not found in the scene');
            }
          } else {
            console.error('Node or scene is null');
          }
        };
        _proto.setFilled = function setFilled(filled) {
          this.isFilled = filled;
          this.updateSprite();
          this.node.emit('state-changed', this); // Сообщаем об изменении состояния всем подписчикам
        };

        _proto.isBolt = function isBolt() {
          return this.isFilled;
        };
        _proto.updateSprite = function updateSprite() {
          var sprite = this.getComponent(Sprite);
          sprite.spriteFrame = this.isFilled ? this.boltSprite : this.slotSprite;
        };
        return SlotOrBolt;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "boltSprite", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "slotSprite", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "isFilled", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "button", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/telegram.js", ['./cjs-loader.mjs'], function (exports, module) {
  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      exports('default', void 0);
      var _cjsExports;
      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
      loader.define(__cjsMetaURL, function (exports$1, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE

        // telegram.js

        window.TelegramAPI = {
          getUserName: function getUserName() {
            var _window$Telegram, _tg$initDataUnsafe;
            var tg = (_window$Telegram = window.Telegram) == null ? void 0 : _window$Telegram.WebApp;
            var user = tg == null || (_tg$initDataUnsafe = tg.initDataUnsafe) == null ? void 0 : _tg$initDataUnsafe.user;
            if (user) {
              return user.username || user.first_name + " " + user.last_name;
            }
            return null;
          },
          closeApp: function closeApp() {
            var _window$Telegram2;
            (_window$Telegram2 = window.Telegram) == null || _window$Telegram2.WebApp.close();
          },
          showAlert: function showAlert(message) {
            var _window$Telegram3;
            (_window$Telegram3 = window.Telegram) == null || _window$Telegram3.WebApp.showAlert(message);
          }

          // Добавь любые другие методы, которые тебе нужны
        };

        // #endregion ORIGINAL CODE

        _cjsExports = exports('default', module.exports);
      }, {});
    }
  };
});

System.register("chunks:///_virtual/telegram.mjs_cjs=&original=.js", ['./telegram.js', './cjs-loader.mjs'], function (exports, module) {
  var __cjsMetaURL, loader;
  return {
    setters: [function (module) {
      __cjsMetaURL = module.__cjsMetaURL;
      var _setter = {};
      _setter.__cjsMetaURL = module.__cjsMetaURL;
      _setter.default = module.default;
      exports(_setter);
    }, function (module) {
      loader = module.default;
    }],
    execute: function () {
      // I am the facade module who provides access to the CommonJS module './telegram.js'~
      if (!__cjsMetaURL) {
        loader.throwInvalidWrapper('./telegram.js', module.meta.url);
      }
      loader.require(__cjsMetaURL);
    }
  };
});

System.register("chunks:///_virtual/TelegramUserDisplay.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "ba950hNox5NtJgYTWmNph+b", "TelegramUserDisplay", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var TelegramUserDisplay = exports('TelegramUserDisplay', (_dec = ccclass('TelegramUserDisplay'), _dec2 = property(Label), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(TelegramUserDisplay, _Component);
        function TelegramUserDisplay() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "userLabel", _descriptor, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = TelegramUserDisplay.prototype;
        _proto.start = function start() {
          // Теперь TypeScript знает, что TelegramAPI существует в глобальном контексте
          var username = window.TelegramAPI.getUserName();
          if (username) {
            this.userLabel.string = "\u041F\u0440\u0438\u0432\u0435\u0442, " + username.trim() + "!";
          } else {
            this.userLabel.string = "Не удалось получить имя пользователя.";
            console.log("Проверьте, что приложение запущено в Telegram.");
          }
        };
        return TelegramUserDisplay;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "userLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});